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
      const booking = await new Booking(trip_id, user_id, seat_number);
      const bookingRows = await booking.createBooking();
      const { id: booking_id, created_on } = bookingRows[0];
      await Trip.updateTrip(trip_id, 'bookings', (bookings + 1)); 
      const response = {
        booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on
      }
      return successResponse(res, 201, response)
    } catch (error) {
      return error;
    }
  }
}