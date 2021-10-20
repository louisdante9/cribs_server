import { createReview, getAllReviews } from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    await getAllReviews(req, res);
  });

  router.post('/add-review', async (req, res) => {
    await createReview(req, res);
  });

  return router;
};
