import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import swaggerDocument from '../swagger.json';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cors
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));


app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Way Farer server started on port ${PORT}...`));

export default app;
