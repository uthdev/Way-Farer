import { Router } from 'express';
import BookingController from '../controllers/bookingControllers';
import Access from '../middlewares/access';
import BookingValidator from '../middlewares/bookingValidators';

const { verifyToken, nonAdmin } = Access;
const { createBookingValidator, bookingIdValidator } = BookingValidator;
const { createBooking, getBookings, deleteBooking } = BookingController;

const bookingRoute = new Router();

bookingRoute.post('/', verifyToken, createBookingValidator, createBooking);
bookingRoute.get('/', verifyToken, getBookings);
bookingRoute.delete('/:bookingId', verifyToken, bookingIdValidator, deleteBooking);

export default bookingRoute;