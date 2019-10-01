import moment from 'moment';
import validate from '../helpers/validator';
import { errorResponse } from '../helpers/responses';

/**
 * @class TripValidator
 * @description validates Trip details
 * @exports TripValidator
 */
export default class TripValidator {
  /**
   * @method createTripValidator
   * @description Method to validates create trip details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {Object} response object if validation fails or next() function when it passes
   */
  static async createTripValidator(req, res, next) {
    const { trip_date } = req.body;

    const now = new Date(moment()).getTime();
    const date = new Date(trip_date).getTime();
    if (now > date) {
      return errorResponse(res, 400, `The trip date must be after ${moment()}`);
    }
    const tripProperties = {
      bus_id: 'required|integer|min:1',
      origin: 'required|string|min:3|max:50',
      destination: 'required|string|min:3|max:50',
      trip_date: 'required|date',
      fare: 'required|numeric|min:0'
    };
    try {
      await validate(res, next, req.body, tripProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method getTripQueryValidator
   * @description Method to validates trips request query params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {Object} response object if validation fails or next() function when it passes
   */
  static async getTripQueryValidator(req, res, next) {
    const { query } = req;
    const { origin, destination } = query;
    const originProperties = {
      origin: 'string|min:3|max:50'
    };
    const destinationProperties = {
      destination: 'string|min:3|max:50'
    };
    try {
      if (origin) {
        await validate(res, next, query, originProperties);
      } else if (destination) {
        await validate(res, next, query, destinationProperties);
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @method tripIdValidator
   * @description Method to validates trip Id request params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {Object} response object if validation fails or next() function when it passes
   */
  static async tripIdValidator(req, res, next) {
    const tripId = req.params;

    const tripIdProperties = {
      tripId: 'integer|min:1|max:10000'
    };
    try {
      await validate(res, next, tripId, tripIdProperties);
    } catch (error) {
      return error;
    }
  }
}
