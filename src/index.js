import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { logger } from './utils';
import config from './config';
import db from './config/db';
import {
  userRoute,
  bookingRoute,
  apartmentRoute,
  ratingRoute,
  favouriteRoute,
} from './middlewares/routes';
import { GlobalErrorHandler } from './middlewares';

const app = express();
const port = parseInt(process.env.PORT, 10) || 9000;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

db(config)
  .then(() => {
    app.use('/user', userRoute(express));
    app.use('/booking', bookingRoute(express));
    app.use('/apartment', apartmentRoute(express));
    app.use('/rating', ratingRoute(express));
    app.use('/favourite', favouriteRoute(express));
    app.post('/check', (req, res) => {
      res.send('this is working');
    });
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
