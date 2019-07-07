import User from '../models/userModel';
import { generateHash } from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';

export default class AuthController {
  static async signUp (req, res) {
    const user = new User(req.body);
    user.password = generateHash(user.password);
    try {
      const rows = await User.findUserByEmail(user.email);
      if (rows.length > 0) {
        return res.status(409).json({
          status: 'error',
          error: 'This email address is already registered'
        });
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
    return res.status(201).json({
      status: 'success',
      data: response
    })

  }
}