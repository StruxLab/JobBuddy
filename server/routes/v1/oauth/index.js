const router = require('express').Router();

router.use('/github', require('./github'));

module.exports = router;
