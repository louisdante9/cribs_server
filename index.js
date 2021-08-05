import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import { logger } from './utils';
import config from './config';
import db from './config/db';
import { login, register, activateUser } from './controllers/user';
import { createApartment, getOneApartments } from './controllers/apartment';
import { createRating } from './controllers/rating';
// const routes = require('./routes');
import { GlobalErrorHandler } from './middlewares';

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

db(config)
  .then(() => {
    // app.use('/v1', routes(express));
    app.use(GlobalErrorHandler);
    app.get('/', (req, res) => {
      res.send('hello there');
    });
    app.post('/register', async (req, res) => {
      await register(req.body, res);
    });
    app.post('/login', async (req, res) => {
      await login(req.body, res, 'user');
    });

    app.post('/activate', async (req, res) => {
      await activateUser(req.body, res);
    });

    app.post('/apartment', async (req, res) => {
      await createApartment(req.body, res);
    });
    app.get('/apartment/:id', async (req, res) => {
      await getOneApartments(req, res);
    });

    app.post('/rating', async (req, res) => {
      await createRating(req, res);
    });

    app.listen(port, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      logger.info(`rezerv service is running on port ${port}`);
    });
  })
  .catch((err) => {
    throw new Error(`Connection error: ${err.message}`);
  });

module.exports = app;
