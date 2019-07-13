import { validate } from '../helpers/validator';

export default class {
  static async createBookingValidator (req, res, next) {
    const booking = req.body;

    const bookingProperties = {
      trip_id: 'required|integer|min:1',
      seat_numnber: 'integer|min:1'
    }

    try {
      await validate(res, next, booking, bookingProperties);
    } catch (error) {
      return error;
    }
  }
}