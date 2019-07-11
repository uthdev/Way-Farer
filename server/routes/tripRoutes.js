import { Router } from 'express';
import TripController from '../controllers/tripControllers';
import Access from '../middlewares/access';
import TripValidator from '../middlewares/tripValidators';

const { createTripValidator, getTripQueryValidator } = TripValidator;
const { createTrip, getAllTrips, filterTrips } = TripController;
const { verifyToken, adminAccess } = Access;

const tripRoute = new Router();

tripRoute.post('/', verifyToken, adminAccess, createTripValidator, createTrip );
tripRoute.get('/', verifyToken, adminAccess, getAllTrips, getTripQueryValidator, filterTrips);

export default tripRoute;