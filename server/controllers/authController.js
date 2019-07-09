import User from '../models/userModel';
import { generateHash, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';
import {successResponse, errorResponse } from '../helpers/responses'

export default class AuthController {
  static async signUp (req, res) {
    const user = new User(req.body);
    user.password = generateHash(user.password);
    try {
      const rows = await User.findUserByEmail(user.email);
      if (rows.length > 0) {
        return errorResponse(res, 409, 'This email address is already registered')
      } 
    } catch (error) {
      return error.message;
    }
    let newUser;
    try {
      newUser = await user.createAccount();   
    } catch(error) {
      return error.message;
    }
    const token = await Jwt.generateToken(newUser);
    const { 
      id: user_id, is_admin, email, first_name, last_name
    } = newUser;
    const response = {
      user_id, is_admin, token, email, first_name, last_name
    }
    return successResponse(res, 201, response);
  }

  static async login (req, res) {
    const { email, password } = req.body;
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
      return errorResponse(res, 401, 'Invalid  password/email')
    }
    const token = await Jwt.generateToken({
      user_id, email, first_name, last_name, is_admin
    });
    const response = {
      user_id, is_admin, token, email, first_name, last_name
    }
    return successResponse(res, 200, response);
  }
}