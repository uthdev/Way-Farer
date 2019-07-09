import express from 'express';
import router from './routes';

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

app.listen(PORT, () => console.log(`Way Farer server started on port ${PORT}...`));

export default app;
