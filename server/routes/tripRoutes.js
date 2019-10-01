import { Router } from 'express';
import TripController from '../controllers/tripControllers';
import Access from '../middlewares/access';
import TripValidator from '../middlewares/tripValidators';

const { createTripValidator, getTripQueryValidator,tripIdValidator, cancelTripValidator } = TripValidator;
const { createTrip, getAllTrips, filterTrips, cancelTrip } = TripController;
const { verifyToken, adminAccess, nonAdmin } = Access;

const tripRoute = new Router();

tripRoute.post('/', verifyToken, adminAccess, createTripValidator, createTrip );
tripRoute.get('/', verifyToken, getAllTrips, nonAdmin, getTripQueryValidator, filterTrips);
tripRoute.patch('/:tripId', verifyToken, adminAccess, tripIdValidator, cancelTripValidator, cancelTrip);

export default tripRoute;