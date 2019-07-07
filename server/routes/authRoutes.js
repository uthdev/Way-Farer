import Router from 'express';
import AuthController from '../controllers/authController';
import AccountValidator from '../middlewares/accountValidation';

const authRoute = new Router();

const { signUp } = AuthController;
const { createAccountValidator } = AccountValidator;


authRoute.post('/signup', createAccountValidator, signUp);

export default authRoute;
