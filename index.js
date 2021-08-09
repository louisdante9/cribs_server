import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { logger } from './utils';
import config from './config';
import db from './config/db';
<<<<<<< HEAD
import { userRoute, bookingRoute, apartmentRoute } from './middlewares/routes';
=======
import { login, register, activateUser } from './controllers/user';
import {
  createApartment,
  getOneApartmentsWithRating,
} from './controllers/apartment';
import { createRating } from './controllers/rating';
import {
  createFavourite,
  getAllFavourites,
  deleteFavouite,
} from './controllers/favourite';
// const routes = require('./routes');
>>>>>>> 27f03c3 (add favourite feature)
import { GlobalErrorHandler } from './middlewares';

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

db(config)
  .then(() => {
    app.use('/user', userRoute(express));
    app.use('/booking', bookingRoute(express));
    app.use('/apartment', apartmentRoute(express));
    app.use('/', (req, res) => {
      res.send('hello there');
    });
    app.use((err, req, res, next) => {
      if (err && err.error && err.error.isJoi) {
        logger.error(err.error.toString());
        res.status(400).json({
          type: err.type,
          message: err.error.toString(),
        });
      } else {
        next(err);
      }
    });
    app.use(GlobalErrorHandler);
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
