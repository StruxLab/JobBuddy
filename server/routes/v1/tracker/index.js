const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log(req.pathname);
  res.json('success');
});
router.post('/', (req, res, next) => {
  console.log(req.body);
  console.log(res.locals.user);
  res.json('success');
});

module.exports = router;
