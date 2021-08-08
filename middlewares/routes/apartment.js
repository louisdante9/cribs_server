import expressJoi from 'express-joi-validation';
import { createApartment } from '../../controllers';
import { user as validate } from '../validators';

const validator = expressJoi.createValidator({
  passError: true,
});
// import jwtVerify from '../utils/jwtVerify';

module.exports = (express) => {
  const router = express.Router();

  router.post('/', createApartment);

  return router;
};
