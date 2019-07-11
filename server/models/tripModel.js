import pool from '../database/index';

class Trip {
  constructor(trip) {
    this.id = undefined;
    this.bus_id = trip.bus_id;
    this.origin = trip.origin;
    this.destination = trip.destination;
    this.trip_date = trip.trip_date;
    this.fare = trip.fare;
    this.status = 'active'
  }

  async createTrip () {
    const queryString = 'INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const params = [this.bus_id, this.origin, this.destination, this.trip_date, this.fare, this.status];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async getAll () {
    const queryString = 'SELECT * FROM trips';
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async filterTrips (filterCriteria, filterValue) {
    const queryString = `SELECT * FROM trips WHERE ${filterCriteria} ILIKE '${filterValue}'`;
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error.message;
    }
  }
}

export default Trip;