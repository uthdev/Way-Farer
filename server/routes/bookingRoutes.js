import { Router } from 'express';
import BookingController from '../controllers/bookingControllers';
import Authenticate from '../middlewares/authenticate';
import BookingServices from '../middlewares/services';
import BookingValidator from '../middlewares/bookingValidators';

const { verifyToken } = Authenticate;
const { createBookingValidator, bookingIdValidator } = BookingValidator;
const { createBooking, getBookings, deleteBooking } = BookingController;
const { hasBooking, isBusFull, isTripAvailable } = BookingServices;

const bookingRoute = new Router();

bookingRoute.post('/', verifyToken, [createBookingValidator, hasBooking, isTripAvailable, isBusFull], createBooking);
bookingRoute.get('/', verifyToken, getBookings);
bookingRoute.delete('/:bookingId', verifyToken, bookingIdValidator, deleteBooking);

export default bookingRoute;
