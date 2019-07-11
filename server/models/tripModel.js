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
}

export default Trip;