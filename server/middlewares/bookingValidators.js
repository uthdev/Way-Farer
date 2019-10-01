import validate from '../helpers/validator';

/**
 * @class BookingValidator
 * @description validates Booking details
 * @exports BookingValidator
 */
export default class BookingValidator {
  /**
   * @method createBookingValidator
   * @description Method to validates create booking details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async createBookingValidator(req, res, next) {
    const booking = req.body;

    const bookingProperties = {
      trip_id: 'required|integer|min:1',
      seat_numnber: 'integer|min:1'
    };

    try {
      await validate(res, next, booking, bookingProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method bookingIdValidator
   * @description Method to validates booking Id request params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async bookingIdValidator(req, res, next) {
    const bookingId = req.params;

    const bookingIdSchema = {
      bookingId: 'integer|min:1|max:10000'
    };
    try {
      await validate(res, next, bookingId, bookingIdSchema);
    } catch (error) {
      return error;
    }
  }
}
