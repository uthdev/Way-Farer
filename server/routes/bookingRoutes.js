import { Router } from 'express';
import BookingController from '../controllers/bookingControllers';
import Access from '../middlewares/access';
import BookingValidator from '../middlewares/bookingValidators';

const { verifyToken, adminAccess, nonAdmin } = Access;
const { createBookingValidator } = BookingValidator;
const { createBooking } = BookingController;

const bookingRoute = new Router();

bookingRoute.post('/', verifyToken, createBookingValidator, createBooking);

export default bookingRoute;