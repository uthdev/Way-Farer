import validate from '../helpers/validator';

/**
 * @class AccountValidator
 * @description validates User details for account creation
 * @exports AccountValidator
 */
export default class AccountValidator {
  /**
   * @method createAccountValidator
   * @description Method to validates signup details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async createAccountValidator(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|string|min:6|max:20',
      first_name: 'required|alpha|min:2|max:50',
      last_name: 'required|alpha|min:2|max:50'
    };

    try {
      await validate(res, next, user, userProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method loginValidator
   * @description Method to validates user login details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async loginValidator(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|string|min:6|max:20'
    };
    
    try {
      await validate(res, next, user, userProperties);
    } catch (error) {
      return error;
    }
  }
}
