import pool from '../database/index';

class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
    this.is_admin = user.is_admin;
  }

  static async findUserByEmail(email) {
    const queryString = 'SELECT  * FROM users WHERE email = $1';
    const param = [email];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  async createAccount() {
    const queryString = `INSERT INTO users (email, first_name, last_name, password)
    VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, is_admin`;
    const params = [this.email, this.first_name, this.last_name,
      this.password];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }
}

export default User;