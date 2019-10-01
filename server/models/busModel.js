import pool from '../database/index';

class Bus {
  static async findBusById(bus_id) {
    const queryString = 'SELECT  * FROM buses WHERE id = $1';
    const param = [bus_id];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}

export default Bus;
