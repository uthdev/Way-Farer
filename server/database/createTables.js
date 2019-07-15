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

    await pool.query(`CREATE TABLE IF NOT EXISTS buses(
      id SERIAL PRIMARY KEY,
      number_plate text NOT NULL,
      manufacturer text NOT NULL,
      model text NOT NULL,
      year text NOT NULL,
      capacity INT NOT NULL)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS trips(
      id SERIAL PRIMARY KEY,
      bus_id INT NOT NULL,
      origin text NOT NULL,
      destination text NOT NULL,
      trip_date TIMESTAMPTZ NOT NULL,
      fare  DECIMAL(10,2) NOT NULL,
      status text NOT NULL,
      bookings INT DEFAULT 0,
      FOREIGN KEY (bus_id) REFERENCES buses (id) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL NOT NULL,
      trip_id INT NOT NULL,
      user_id INT NOT NULL,
      email text NOT NULL, 
      first_name text NOT NULL,
      last_name text NOT NULL,
      created_on TIMESTAMPTZ DEFAULT NOW(),
      seat_number INT,
      PRIMARY KEY (trip_id, user_id),
      FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE)`);
      
  } catch (error) {
    return error;
  }
  console.log('Table created');
})();
