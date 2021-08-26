const { Pool } = require('pg');
require('dotenv').config();

const createTables = require('./createTables');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

console.log('Initializing');

(async () => {
  const client = await pool.connect();
  try {
    await client.query(createTables);
    console.log('Success');
  } catch (e) {
    console.log('Query Failed');
    console.log(e);
  } finally {
    console.log('Ended');
    await client.release();
    await pool.end();
    process.exit();
  }
})();
