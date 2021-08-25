const router = require('express').Router();

router.use('/', (req, res, next) => {
  res.send('test');
});

module.exports = router;
