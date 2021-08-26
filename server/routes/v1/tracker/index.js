const router = require('express').Router();

const Models = require('#models');

// New Item in Tracker
router.post('/', Models.v1.tracker.addToList);

// Update Status or something
router.put('/', (req, res, next) => {
  console.log(req.body);
  console.log(res.locals.user);
  res.json('success');
});

// Get User's Postings
router.post('/list', Models.v1.tracker.getList);

module.exports = router;
