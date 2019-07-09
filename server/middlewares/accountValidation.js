import { validate } from '../helpers/validator';

export default class AccountValidator {
  static async createAccountValidator (req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|alpha_dash|min:6|max:20',
      first_name: 'required|alpha|min:2|max:50',
      last_name: 'required|alpha|min:2|max:50'     
    };

    try {
      await validate(res, next, user, userProperties);
    } catch(error) {
      return error;
    }
  }
}