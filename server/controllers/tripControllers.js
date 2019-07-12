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

  static async getAllTrips (req, res, next) {
    const { origin, destination } = req.query;
    if(origin || destination) {
      return next()
    }
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

  static async filterTrips (req, res) {
    const { origin, destination } = req.query;
    try{
      if (origin) {
        const originFiltered = await Trip.filterTrips('origin', origin);
        if ( originFiltered <= 0) {
          return errorResponse(res, 404, `No trip of ${origin} origin`);
        } else {
          return successResponse(res, 200, originFiltered);
        }
      }  else if (destination) {
        const destinationFiltered = await Trip.filterTrips('destination', destination);
        if (destinationFiltered <= 0) {
          return errorResponse(res, 404, `No trip of ${destination} destination`);
        } else {
          return successResponse(res, 200, destinationFiltered);
        }
      }
    } catch (error) {
      return error;
    }
  }

  static async cancelTrip (req, res) {
    const { status } = req.body;
    const { tripId }= req.params;
    try {
      const rows = await Trip.findTripById(tripId);
      if (rows.length <= 0) {
        return errorResponse(res, 404, `Trip with Id: ${tripId} does not exist`)
      }
      const updatedRows = await Trip.updateTrip(tripId, 'status', status);
      const { id, bus_id, origin, destination,trip_date, fare } = updatedRows[0];
      const response = {
        message: 'Trip cancelled successfully',
        id, bus_id, origin, destination, trip_date, fare, status
      }
      return successResponse(res, 200, response);
    } catch (error) {
      return error;
    }
  }
}