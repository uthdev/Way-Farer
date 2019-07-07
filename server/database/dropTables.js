import pool from './index';

console.log('Dropping tables...');

(async () => {
  try{ 
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
  } catch (error) {
    console.log(error);
  }
  console.log('Tables dropped');
})();