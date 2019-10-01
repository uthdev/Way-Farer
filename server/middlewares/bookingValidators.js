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

  static async bookingIdValidator (req, res, next) {
    const bookingId = req.params;

    const bookingIdSchema = {
      bookingId: 'numeric|min:1|max:10000'
    }  
    try {
      await validate(res, next, bookingId, bookingIdSchema);
    } catch (error) {
      return error;
    }
  }
}