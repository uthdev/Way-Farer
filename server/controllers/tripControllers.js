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
}