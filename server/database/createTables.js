import pool from './index';

console.log('Creating table...');

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email text NOT NULL, 
      first_name text NOT NULL,
      last_name text NOT NULL,
      password text NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE)`);
  } catch(error) {
    console.log(error);
  }
  console.log('Table created')
})();