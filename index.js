import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import { logger } from './utils';
import config from './config';
import db from './config/db';
// const routes = require('./routes');
import { GlobalErrorHandler } from './middlewares';

const app = express();
const port = process.env.PORT || 3000;

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
