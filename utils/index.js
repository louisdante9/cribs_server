import jwt from 'jsonwebtoken';
import config from '../config';

const { createLogger, format, transports } = require('winston');
const { combine, prettyPrint, json, errors } = format;
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}


export const logger = createLogger({
    format: combine(errors({ stack: true }), json()),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logfile.log' })
    ]
  });

if (process.env.NODE_ENV === 'local') {
  /* istanbul ignore next */
  logger.add(
    new transports.Console({
      format: combine(errors({ stack: true }), prettyPrint()),
    }),
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
          message: 'You have to be loggedin first'
        });
      }
    }
  };


export const generateToken = paylaod => {
  const options = {
    algorithm: 'HS256',
    issuer: 'cryptoxchangeco.com',
    audience: 'cryptoxchangeco.com',
    expiresIn: '365 days',
  };

  return jwt.sign(paylaod, config.secret, options);
};

export const checkRole = roles => (req, res, next) =>
    !roles.includes(req.decoded.role)
        ? res.status(401).json("Unauthorized")
        : next();