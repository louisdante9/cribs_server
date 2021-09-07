import { getAllBookingAsAdmin } from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.get('/', getAllBookingAsAdmin);

  return router;
};
