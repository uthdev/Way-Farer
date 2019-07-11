import moment from 'moment';
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
}