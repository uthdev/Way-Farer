import User from '../models/userModel';
import { generateHash, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';
import { successResponse, errorResponse } from '../helpers/responses';

/**
 * @class AuthController
 * @description Controllers for Users
 * @exports AuthController
 */
export default class AuthController {
  /**
   * @method signUp
   * @description Method for user registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signUp(req, res) {
    try {
      const user = new User(req.body);
      user.password = generateHash(user.password);
      const rows = await User.findUserByEmail(user.email);
      if (rows.length > 0) {
        return errorResponse(res, 409, 'This email address is already registered');
      }
      const newUser = await user.createAccount();
      const {
        id: user_id, is_admin, email, first_name, last_name
      } = newUser;
      const token = await Jwt.generateToken({
        user_id, email, first_name, last_name, is_admin
      });
      const response = {
        user_id, is_admin, token, email, first_name, last_name
      };
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method login
   * @description Method for user sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const rows = await User.findUserByEmail(email);
      if (rows.length <= 0) {
        return errorResponse(res, 404, 'User does not exist');
      }
      const user = rows[0];
      const {
        id: user_id, password: hashedPassword, first_name, last_name, is_admin
      } = user;
      const isMatch = comparePassword(password, hashedPassword);
      if (!isMatch) {
        return errorResponse(res, 401, 'Invalid  password/email');
      }
      const token = await Jwt.generateToken({
        user_id, email, first_name, last_name, is_admin
      });
      const response = {
        user_id, is_admin, token, email, first_name, last_name
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
