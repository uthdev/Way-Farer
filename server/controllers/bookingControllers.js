import Booking from '../models/bookingModel';
import Trip from '../models/tripModel';
import Bus from '../models/busModel';
import {successResponse, errorResponse } from '../helpers/responses';


export default class BookingController {
  static async createBooking (req, res) {
    const {trip_id, seat_number } = req.body;
    const { user_id, email, first_name, last_name } = req.user;
    try {
      const tripRows = await Trip.findTripById(trip_id);
      if (tripRows.length <= 0) {
        return errorResponse(res, 404, `The trip you are making a booking to does not exist`)
      }
      const { status, bookings, bus_id, trip_date  } = tripRows[0];
      if (status === 'cancelled') {
        return errorResponse(res, 403, 'The trip you are making a booking to has been cancelled');
      }
      const busRows  = await Bus.findBusById(bus_id);
      const { capacity } = busRows[0];
      if (bookings === capacity) {
        return errorResponse(res, 403, 'The trip has been fully booked');
      }
      const bookingExist = await Booking.findBookingByUser(trip_id, user_id);
      if (bookingExist.length > 0) {
        return errorResponse(res, 403, 'You cannot make more than one booking');
      }
      const booking = await new Booking(trip_id, user_id, seat_number, first_name, last_name, email);
      const bookingRows = await booking.createBooking();
      const { id, created_on } = bookingRows[0];
      await Trip.updateTrip(trip_id, 'bookings', (bookings + 1)); 
      const response = {
        id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on
      }
      return successResponse(res, 201, response)
    } catch (error) {
      return error;
    }
  }

  static async getBookings (req, res) {
    const { is_admin, user_id } = req.user;
    try {
      let bookings;
      is_admin ? bookings = await Booking.getAll() : bookings = await Booking.getAllByUser(user_id);
      if ( bookings <= 0) {
        return errorResponse(res, 404, 'No existing booking');
      } else {
        return successResponse(res, 200, bookings)
      }    
    } catch (error) {
      return error;
    }
  }

  static async deleteBooking (req, res) {
    const { bookingId } = req.params;
    const { user_id } = req.user;
    try {
      const bookingExists = await Booking.findBooking(bookingId);
      if (!bookingExists) {
        return errorResponse(res, 404, 'The booking does not exist');
      }
      const { id: booking_id, seat_number, created_on} = bookingExists;
      if (bookingExists.user_id != user_id) {
        return errorResponse(res, 403, 'You can only delete your own booking');
      }
      await Booking.deleteBooking(bookingId);
      const response = {
        message: 'Booking deleted successfully',
        booking_id, user_id, seat_number, created_on
      }
      return successResponse(res, 200, response);
    } catch (error) {
      return error;
    }
  }
}