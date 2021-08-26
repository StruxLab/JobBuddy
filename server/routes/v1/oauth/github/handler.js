const router = require('express').Router();

const Models = require('#models');

router.get('/', Models.v1.oauth.github.handler);

module.exports = router;
