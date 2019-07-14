import { Router } from 'express';
import authRoute from './authRoutes';
import tripRoute from './tripRoutes';
import bookingRoute from './bookingRoutes';

const router = new Router();

router.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Way Farer API',
  });
});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/trips', tripRoute);
router.use('/api/v1/bookings', bookingRoute);

export default router;
