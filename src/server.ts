import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import errorMiddleware from './middlewares/error';

import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errorMiddleware);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
