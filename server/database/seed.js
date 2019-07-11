import pool from './index';
import { generateHash }  from '../helpers/bcrypt';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

(async () => {
  const hashedPassword = generateHash(adminPassword);
  const params = [adminEmail, 'Gbolahan', 'Adeleke', hashedPassword, true];
  try {
    const result = await pool.query('INSERT INTO users (email, first_name, last_name, password, is_admin) VALUES ($1, $2, $3, $4, $5)', params);
    console.log('Admin seeded');
    return result;
  } catch (error) {
     console.log(error);
  }
})();

