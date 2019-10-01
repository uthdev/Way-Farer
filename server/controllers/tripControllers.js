import Trip from '../models/tripModel';
import Bus from '../models/busModel';
import { successResponse, errorResponse } from '../helpers/responses';

/**
 * @class TripController
 * @description Controllers for handling Trip requests
 * @exports TripController
 */
export default class TripController {
  /**
   * @method createTrip
   * @description Method to create a trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Newly created trip object
   */
  static async createTrip(req, res) {
    const { bus_id } = req.body;
    try {
      const bus = await Bus.findBusById(bus_id);
      if (!bus) {
        return errorResponse(res, 404, 'Bus not available');
      }
      const trip = await new Trip(req.body);
      const rows = await trip.createTrip();
      return successResponse(res, 201, rows[0]);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method getAllTrips
   * @description Method to get all trips created
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   * @returns {object} All trips details or the next function if there is a query params
   */
  static async getAllTrips(req, res, next) {
    const { origin, destination } = req.query;
    if (origin || destination) {
      return next();
    }
    try {
      const trips = await Trip.getAll();
      if (trips <= 0) {
        return errorResponse(res, 404, 'No existing trip');
      }
      return successResponse(res, 200, trips);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method filterTrips
   * @description Method to get all trips associated with an origin and or destination
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All trips details associated with an origin or destination
   */
  static async filterTrips(req, res) {
    const { origin, destination } = req.query;
    try {
      let filteredTrips;
      switch (true) {
        case ((origin && destination) ? true : false):
          filteredTrips = await Trip.filterTrips([origin.toLowerCase(), destination.toLowerCase()]);
          break;
        case (destination ? true: false):
          filteredTrips = await Trip.filterTrips(destination.toLowerCase(), 'destination');
          break;
        default:
          filteredTrips = await Trip.filterTrips(origin.toLowerCase(), 'origin');
          break;
      }
      // if (origin && destination) {
      //   filteredTrips = await Trip.filterTrips([origin.toLowerCase(), destination.toLowerCase()]);
      // } else if (destination) {
      //   filteredTrips = await Trip.filterTrips(destination.toLowerCase(), 'destination');
      // } else {
      //   filteredTrips = await Trip.filterTrips(origin.toLowerCase(), 'origin');
      // }
      if (filteredTrips <= 0) {
        return errorResponse(res, 404, 'Trips not found');
      }
      return successResponse(res, 200, filteredTrips);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method cancelTrip
   * @description Method to cancel a trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object with a success message
   */
  static async cancelTrip(req, res) {
    const { tripId } = req.params;
    try {
      const trip = await Trip.findTripById(tripId);
      if (!trip) {
        return errorResponse(res, 404, 'The trip does not exist');
      }
      const updatedRows = await Trip.updateTrip(tripId, 'status', 'cancelled');
      const {
        id, bus_id, origin, destination, trip_date, fare, status
      } = updatedRows[0];
      const response = {
        message: 'Trip cancelled successfully',
        id,
        bus_id,
        origin,
        destination,
        trip_date,
        fare,
        status
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
