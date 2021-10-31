import {
  createPayment,
  getAllUserPayments,
  getOneUserPayment,
} from '../../controllers';

module.exports = (express) => {
  const router = express.Router();
  router.get('/:userId', async (req, res) => {
    await getAllUserPayments(req, res);
  });
  router.post('/add-payment', async (req, res) => {
    await createPayment(req, res);
  });

  router.get('/:userId/payment/:apartmentId', async (req, res) => {
    await getOneUserPayment(req, res);
  });
  return router;
};
