const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.indeed.com');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      res.locals.user = decoded.uid;
    } catch (e) {
      console.log(e);
    }
  }
  next();
};
