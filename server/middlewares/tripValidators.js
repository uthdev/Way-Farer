import { validate } from '../helpers/validator';

export default class TripValidator {
  static async createTripValidator (req, res, next) {
    const trip = req.body;

    const tripProperties = {
      bus_id: 'required|integer|min:1',
      origin: 'required|string|min:3|max:50',
      destination: 'required|string|min:3|max:50',
      trip_date: 'required|date',
      fare: 'required|numeric|min:0'
    }
    try {
      await validate(res, next, trip, tripProperties);
    } catch(error) {
      return error;
    }
  }

  static async getTripQueryValidator(req, res, next) {
    const query = req.query;
    const { origin, destination } = query;
    const originProperties = {
      origin: 'string|min:3|max:50'
    }
    const destinationProperties = {
      destination: 'string|min:3|max:50'
    }
    try {
      if(origin) {
        await validate(res, next, query, originProperties);
      } else if (destination) {
        await validate(res, next, query, destinationProperties);
      }
    } catch (error) {
      return error;
    }
  }

  static async tripIdValidator (req, res, next) {
    const tripId = req.params;

    const tripIdProperties = {
      tripId: 'numeric|min:1|max:10000'
    }
    try {
      await validate(res, next, tripId, tripIdProperties);
    } catch (error) {
      return error;
    } 
  }

  static async cancelTripValidator (req, res, next) {
    const cancelTrip = req.body;
    const cancelTripProperties = {
      status: ['regex:/cancelled/i']
    }
    try {
      await validate(res, next, cancelTrip, cancelTripProperties);
    } catch (error) {
      return error;
    } 
  }
}