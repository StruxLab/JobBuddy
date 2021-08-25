const router = require('express').Router();

router.use('/handler', require('./handler'));

router.get('/', (req, res, next) => {
  console.log(req.pathname);
  res.json('success');
});

module.exports = router;
