import { Router } from 'express';
import TripController from '../controllers/tripControllers';
import Authenticate from '../middlewares/authenticate';
import TripValidator from '../middlewares/tripValidators';

const { createTripValidator, getTripQueryValidator, tripIdValidator } = TripValidator;
const {
  createTrip, getAllTrips, filterTrips, cancelTrip
} = TripController;
const { verifyToken, adminAccess } = Authenticate;

const tripRoute = new Router();

tripRoute.post('/', verifyToken, adminAccess, createTripValidator, createTrip);
tripRoute.get('/', verifyToken, getAllTrips, getTripQueryValidator, filterTrips);
tripRoute.patch('/:tripId/cancel', verifyToken, adminAccess, tripIdValidator, cancelTrip);

export default tripRoute;
