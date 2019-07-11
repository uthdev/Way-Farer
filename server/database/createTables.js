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

    await pool.query(`CREATE TABLE IF NOT EXISTS trips(
      id SERIAL PRIMARY KEY,
      bus_id INT NOT NULL,
      origin text NOT NULL,
      destination text NOT NULL,
      trip_date TIMESTAMPTZ NOT NULL,
      fare  DECIMAL(10,2) NOT NULL,
      status text NOT NULL)`);
  } catch(error) {
    console.log(error);
  }
  console.log('Table created')
})();