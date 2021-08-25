const router = require('express').Router();

/*
  # API Reference:

  jobbuddy.mchan.me/api/v1/
*/

router.use('/v1', require('./v1'));

module.exports = router;
