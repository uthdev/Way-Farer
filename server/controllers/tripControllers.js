import Trip from '../models/tripModel';
import {successResponse, errorResponse } from '../helpers/responses';

export default class TripController {
  static async createTrip (req, res) {
    try {
      const trip = await new Trip(req.body);
      const rows = await trip.createTrip();
      return successResponse(res, 201, rows[0])
    } catch (error) {
      return error;
    }
  }

  static async getAllTrips (req, res) {
    try{
      const trips = await Trip.getAll();
      if ( trips <= 0) {
        return errorResponse(res, 404, 'No existing trip');
      } else {
        return successResponse(res, 200, trips)
      }
    } catch (error) {
      return error;
    }
  }
}