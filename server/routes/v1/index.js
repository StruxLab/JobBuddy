const router = require('express').Router();

/*
  # API Reference:

  jobbuddy.mchan.me/api/v1/
*/
router.use('/oauth', require('./oauth'));
router.use('/tracker', require('./tracker'));

module.exports = router;
