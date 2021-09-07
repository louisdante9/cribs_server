import expressJoi from 'express-joi-validation';
import { createRating, getAllRating } from '../../controllers';
import { user as validate } from '../validators';

const validator = expressJoi.createValidator({
  passError: true,
});
// import jwtVerify from '../utils/jwtVerify';

module.exports = (express) => {
  const router = express.Router();

  router.post('/', createRating);
  router.get('/', getAllRating);

  return router;
};
