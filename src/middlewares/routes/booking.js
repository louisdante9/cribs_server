import {
  getAllBookingAsAdmin,
  checkBookingAvailability,
  createBooking,
  getAllAvailableBookingDate,
  getAllHomeOwnerBookings,
  getAllUserBookings,
} from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.get('/', getAllBookingAsAdmin);
  router.get('/home/:homeOwnerId', getAllHomeOwnerBookings);
  router.get('/user/:userId', getAllUserBookings);
  router.post('/', async (req, res) => {
    await createBooking(req, res);
  });
  router.post('/check', async (req, res) => {
    await checkBookingAvailability(req, res);
  });
  router.get('/:apartmentId', async (req, res) => {
    await getAllAvailableBookingDate(req, res);
  });

  return router;
};
