const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log(req.pathname);
  res.json('success');
});

module.exports = router;
