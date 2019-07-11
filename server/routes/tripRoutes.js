import { Router } from 'express';
import TripController from '../controllers/tripControllers';
import Access from '../middlewares/access';
import TripValidator from '../middlewares/tripValidators';

const { createTripValidator } = TripValidator;
const { createTrip, getAllTrips } = TripController;
const { verifyToken, adminAccess } = Access;

const tripRoute = new Router();

tripRoute.post('/', verifyToken, adminAccess, createTripValidator, createTrip );
tripRoute.get('/', verifyToken, adminAccess, getAllTrips);

export default tripRoute;