import { Router } from 'express';
import TripController from '../controllers/tripControllers';
import Access from '../middlewares/access';
import TripValidator from '../middlewares/tripValidators';

const { createTripValidator } = TripValidator;
const { createTrip } = TripController;
const { verifyToken, adminAccess } = Access;

const tripRoute = new Router();

tripRoute.post('/', verifyToken, adminAccess, createTripValidator, createTrip );

export default tripRoute;