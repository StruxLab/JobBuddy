// https://github.com/login/oauth/authorize?client_id=4d815e2740249b35e920&redirect_uri=http://localhost:40300/v1/oauth/github/handler&state=dfgafdsg54gw45gfds
module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.query);
  res.json('test');
};
