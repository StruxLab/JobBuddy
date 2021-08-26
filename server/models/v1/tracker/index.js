const { pool } = require('#helpers/database.js');

const { addJobPosting, getSavedJobs } = require('#database');

const addToList = async (req, res, next) => {
  if (!res.locals.user) return next([401]);
  console.log(res.locals.user);
  console.log(req.body);
  const client = await pool.connect();
  try {
    const { rows } = await client.query(addJobPosting, [
      res.locals.user,
      req.body.provider,
      req.body.status,
      req.body.jobRole,
      req.body.salary,
      req.body.location,
      req.body.employer,
      req.body.id
    ]);
    return next([201, rows[0]])
  } catch (e) {
    console.log(e);
    return next([400]);
  } finally {
    client.release();
  }
};

const getList = async (req, res, next) => {
  console.log(req.body);
  const { provider, ids } = req.body;
  console.log(ids);
  if (!res.locals.user) return next([401]);
  if (Array.isArray(ids) && ids.length > 25) return next([400]);
  const client = await pool.connect();
  try {
    const { rows } = await client.query(getSavedJobs(ids), [
      res.locals.user,
      provider,
      ...ids
    ]);
    next([200, rows])
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
  next([200]);
}

module.exports = {
  addToList,
  getList,
};
