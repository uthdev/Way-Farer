import pool from '../database/index';

class Booking {
  constructor(trip_id, user_id, seat_number) {
    this.id = undefined;
    this.trip_id = trip_id;
    this.user_id = user_id
    this.seat_number = seat_number;
    this.created_on = new Date(Date.now());
  }

  async createBooking () {
    const queryString = 'INSERT INTO bookings (trip_id, user_id, seat_number, created_on) VALUES ($1, $2, $3, $4) RETURNING *';
    const params = [this.trip_id, this.user_id, this.seat_number, this.created_on];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async findBookingByUser (trip_id, user_id) {
    const queryString = 'SELECT * FROM bookings WHERE trip_id = $1 AND user_id = $2';
    const params = [trip_id, user_id];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error.message
    }
  }

  static async getAll() {
    const queryString =  'SELECT * FROM bookings';
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async getAllByUser (userId) {
    const queryString = 'SELECT * FROM bookings WHERE user_id = $1';
    const params = [userId];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async findBooking (bookingId) {
    const queryString = 'SELECT * FROM bookings WHERE id = $1';
    const param = [bookingId];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  } 

  static async deleteBooking (bookingId) {
    const queryString = 'DELETE FROM bookings WHERE id = $1';
    const param = [bookingId];
    try {
      const result = await pool.query(queryString, param);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}

export default Booking;