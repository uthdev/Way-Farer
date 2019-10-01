import moment from 'moment';
import Trip from '../models/tripModel';
import Bus from '../models/busModel';
import Booking from '../models/bookingModel';
import { errorResponse } from '../helpers/responses';

/**
 * @class BookingServices
 * @description validates User details for account creation
 * @exports BookingServices
 */
class BookingServices {
  /**
   * @method isTripAvailable
   * @description Method to check if trip is availble
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if check fails or next() function when it passes
   */
  static async isTripAvailable(req, res, next) {
    const { trip_id } = req.body;
    try {
      const trip = await Trip.findTripById(trip_id);
      if (!trip) {
        return errorResponse(res, 404, 'The trip you are making a booking to does not exist');
      }
      const { status, trip_date } = trip;
      if (status === 'cancelled') {
        return errorResponse(res, 403, 'The trip you are making a booking to has been cancelled');
      } if (new Date(moment()).getTime() > new Date(trip_date).getTime()) {
        return errorResponse(res, 403, 'Trip not available');
      }
      req.trip = trip;
      next();
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method isBusFull
   * @description Method to check if bus is available
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if check fails or next() function when it passes
   */
  static async isBusFull(req, res, next) {
    const { bus_id, bookings } = req.trip;
    try {
      const bus = await Bus.findBusById(bus_id);
      const { capacity } = bus;
      if (bookings === capacity) {
        return errorResponse(res, 403, 'The trip has been fully booked');
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method hasBooking
   * @description Method to user has made a booking before
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if check fails or next() function when it passes
   */
  static async hasBooking(req, res, next) {
    const { user_id } = req.user;
    const { trip_id } = req.body;
    try {
      const bookingExist = await Booking.findBookingByUser(trip_id, user_id);
      if (bookingExist) {
        return errorResponse(res, 403, 'You cannot make more than one booking');
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }
}

export default BookingServices;
