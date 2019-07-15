import Jwt from '../helpers/jwt';
import { errorResponse } from '../helpers/responses';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
export default class Authenticate {
  /**
   * @method verifyToken
   * @description Method to verify user Bearer token
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    try {
      const decoded = await Jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, 403, 'Authorisation failed! Token expired');
      }
      return errorResponse(res, 403, `Authorization fail! ${error.message}`);
    }
  }

  /**
   * @method adminAccess
   * @description verify if user role is admin
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async adminAccess(req, res, next) {
    const { is_admin } = req.user;
    if (is_admin !== true) {
      return errorResponse(res, 403, 'Unauthorized! Accessible to admin only');
    }
    next();
  }
}
