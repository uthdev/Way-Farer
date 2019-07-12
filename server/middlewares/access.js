import Jwt from '../helpers/jwt';
import { errorResponse } from '../helpers/responses';

export default class Access {
  static async verifyToken (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      return errorResponse(res, 401, 'Authorization token required')
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    try {
      const decoded = await Jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError' ) {
        return errorResponse(res, 403, 'Authorisation failed! Token expired');
      }
      return errorResponse(res, 403, `Authorization fail! ${error.message}`);
    }
  }

  static async adminAccess (req, res, next) {
    const { is_admin } = req.user;
    if (is_admin !== true) {
      return errorResponse(res, 403, 'Unauthorized! Accessible to admin only');
    }
    next();
  }

  static async nonAdmin (req, res, next) {
    const { is_admin } = req.user;
    if (is_admin) {
      return errorResponse(res, 403, 'Unauthorized! Not accessible to admin');
    } 
    next(); 
  } 
}