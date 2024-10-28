

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from './api/routes/main.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: 'GET,PATCH,POST'
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', async (_req, res) => {
  res.status(200).json({
    serverStatus: true
  });
});

app.set('trust proxy', 'linklocal');

app.use('/api', router);
app.use(errorHandler);

export default app;