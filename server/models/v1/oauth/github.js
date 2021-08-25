// https://github.com/login/oauth/authorize?client_id=4d815e2740249b35e920&redirect_uri=http://localhost:40300/v1/oauth/github/handler&state=dfgafdsg54gw45gfds

const axios = require('axios');
const qs = require('querystring');

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
    const { data: { id: gitHubUserId } } = await axios({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return [null, gitHubUserId];
  } catch (e) {
    return [e];
  }
};

const handler = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const [authError, gitHubId] = await verifyWithGitHub(req.query.code);
  if (authError) {
    console.log(authError);
    return next([authError]);
  }
  return next([200, gitHubId]);
};

module.exports = {
  handler,
};
