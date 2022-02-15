import { Pool } from 'pg';

export const pg = {
  users: new Pool({ database: process.env.PGUSERDATABASE }),
  data: new Pool({ database: process.env.PGJBDATABASE }),
};
