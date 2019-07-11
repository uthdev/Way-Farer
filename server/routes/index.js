import { Router } from 'express';
import authRoute from './authRoutes';
import tripRoute from './tripRoutes';

const router = new Router();

router.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Quick Credit API',
  });
});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/trips', tripRoute);

export default router;
