import jwt from 'jsonwebtoken';
import config from '../config';

const { createLogger, format, transports } = require('winston');

const { combine, prettyPrint, json, errors } = format;
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const logger = createLogger({
  format: combine(errors({ stack: true }), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logfile.log' }),
  ],
});

if (process.env.NODE_ENV === 'local') {
  /* istanbul ignore next */
  logger.add(
    new transports.Console({
      format: combine(errors({ stack: true }), prettyPrint()),
    })
  );
}

export const jwtVerify = {
  /**
   * @method hasToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  verifyToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send(err);
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(403).send({
        message: 'You have to be loggedin first',
      });
    }
  },
};

export const generateToken = (paylaod) => {
  const options = {
    algorithm: 'HS256',
    issuer: 'cryptoxchangeco.com',
    audience: 'cryptoxchangeco.com',
    expiresIn: '365 days',
  };

  return jwt.sign(paylaod, config.secret, options);
};

export const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.decoded.role)
    ? res.status(401).json('Unauthorized')
    : next();

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
