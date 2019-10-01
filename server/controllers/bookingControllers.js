import Booking from '../models/bookingModel';
import Trip from '../models/tripModel';
import { successResponse, errorResponse } from '../helpers/responses';


/**
 * @class BookingController
 * @description Controllers for handling Booking requests
 * @exports BookingController
 */
export default class BookingController {
  /**
   * @method createBooking
   * @description Method to create accommodation facilities
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Newly created booking details
   */
  static async createBooking(req, res) {
    const { trip_id, seat_number } = req.body;
    const {
      user_id, email, first_name, last_name
    } = req.user;
    const { bus_id, trip_date, bookings } = req.trip;
    try {
      const booking = new Booking(trip_id, user_id, seat_number, first_name, last_name, email);
      const newBooking = await booking.createBooking();
      const { id, created_on } = newBooking;
      await Trip.updateTrip(trip_id, 'bookings', (bookings + 1));
      const response = {
        id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on
      };
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method getBookings
   * @description Method to get all bookings made
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All booking details
   */
  static async getBookings(req, res) {
    const { is_admin, user_id } = req.user;
    try {
      const bookings = is_admin ? await Booking.getAll() : await Booking.getAllByUser(user_id);
      if (bookings <= 0) {
        return errorResponse(res, 404, 'No existing booking');
      }
      return successResponse(res, 200, bookings);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
    * @method deleteBooking
    * @description Method to delete a booking
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {string} response body object with a success message
    */
  static async deleteBooking(req, res) {
    const { bookingId } = req.params;
    const { user_id } = req.user;
    try {
      const bookingExists = await Booking.findBooking(bookingId);
      if (!bookingExists) {
        return errorResponse(res, 404, 'The booking does not exist');
      }
      const { id: booking_id, seat_number, created_on } = bookingExists;
      if (bookingExists.user_id !== user_id) {
        return errorResponse(res, 403, 'You can only delete your own booking');
      }
      await Booking.deleteBooking(bookingId);
      const response = {
        message: 'Booking deleted successfully',
        booking_id,
        user_id,
        seat_number,
        created_on
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
