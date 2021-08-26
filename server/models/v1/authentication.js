module.exports = (req, res, next) => {
  try {
    // const token = generateAccessToken(gitHubId);
    //const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // console.log(decoded);
  } catch (e) {
    // return next([401]);
  }
  console.log(req.headers);
  res.locals.user = 'test';
  return next();
};
