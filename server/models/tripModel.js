import pool from '../database/index';

class Trip {
  constructor(trip) {
    this.id = undefined;
    this.bus_id = trip.bus_id;
    this.origin = trip.origin.toLowerCase();
    this.destination = trip.destination.toLowerCase();
    this.trip_date = trip.trip_date;
    this.fare = trip.fare;
    this.status = 'active';
    this.bookings = 0;
  }

  async createTrip() {
    const queryString = 'INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status, bookings) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const params = [this.bus_id, this.origin, this.destination, this.trip_date, this.fare, this.status, this.bookings];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  static async getAll() {
    const queryString = 'SELECT * FROM trips';
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  static async filterTrips(filterValues, filterCriteria) {
    let queryString;
    if (typeof filterValues === 'object') {
      queryString = `SELECT * FROM trips WHERE origin = '${filterValues[0]}' AND destination = '${filterValues[1]}'`;
    } else {
      queryString = `SELECT * FROM trips WHERE ${filterCriteria} = '${filterValues}'`;
    }
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  static async findTripById(tripId) {
    const queryString = 'SELECT  * FROM trips WHERE id = $1';
    const param = [tripId];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows[0];
    } catch (error) {
      throw error.message;
    }
  }

  static async updateTrip(tripId, rowToUpdate, updateValue) {
    const queryString = `UPDATE trips SET ${rowToUpdate.replace(/"/g, '')} = $1 WHERE id = $2 RETURNING *`;
    const params = [updateValue, tripId];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}

export default Trip;
