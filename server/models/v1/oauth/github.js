// https://github.com/login/oauth/authorize?client_id=4d815e2740249b35e920&redirect_uri=http://localhost:40300/v1/oauth/github/handler&state=dfgafdsg54gw45gfds

const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { pool } = require('#helpers/database.js');

// require('crypto').randomBytes(64).toString('hex')

const verifyWithGitHub = async (code) => {
  try {
    const { data: authenticationObject } = await axios({
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
    });
    const { access_token: accessToken } = qs.parse(authenticationObject);
    const { data: { id: gitHubUserId, email: gitHubEmail } } = await axios({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const client = await pool.connect();
    try {
      const { rows } = await client.query(`WITH existingId AS (
        INSERT INTO users (github, email)
        VALUES ($1, $2)
        ON CONFLICT (github) DO NOTHING
        RETURNING *
      )
      SELECT id
      FROM users
      WHERE github = $1;`, [gitHubUserId, gitHubEmail || null]);
      const { id } = rows[0];
      return [null, id];
    } catch (e) {
      console.log(e);
    } finally {
      client.release();
    }
  } catch (e) {
    return [e];
  }
};

const generateAccessToken = (uid) => {
  return jwt.sign({
    uid,
  }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1w' });
};

const handler = async (req, res, next) => {
  console.log(res.locals);
  res.setHeader('Access-Control-Allow-Origin', '*');
  const [authError, userId] = await verifyWithGitHub(req.query.code);
  if (authError) {
    console.log(authError);
    return next([400]);
  }
  console.log(userId);
  const token = generateAccessToken(userId);
  return next([200, token]);
};

module.exports = {
  handler,
};
