const router = require('express').Router();

/*
  # API Reference:

  jobbuddy.mchan.me/api/v1/
*/

router.use('/v1', require('./v1')); // TODO: Implement v1 api

module.exports = router;
