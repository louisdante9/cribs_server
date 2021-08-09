// import expressJoi from 'express-joi-validation';
import {
  deleteFavourite,
  getAllFavourites,
  createFavourite,
} from '../../controllers';
// import { user as validate } from '../validators';

// const validator = expressJoi.createValidator({
// passError: true,
// });
// import jwtVerify from '../utils/jwtVerify';

module.exports = (express) => {
  const router = express.Router();

  router.post('/', createFavourite);
  router.get('/', getAllFavourites);
  router.delete('/:id', deleteFavourite);

  return router;
};
