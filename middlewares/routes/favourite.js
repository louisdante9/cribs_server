import {
  getAllFavourites,
  createFavourite,
  deleteFavourite,
} from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    await getAllFavourites(req, res);
  });
  router.post('/add-favourite', async (req, res) => {
    await createFavourite(req, res);
  });
  router.delete('/:userId/del/:apartmentId', async (req, res) => {
    await deleteFavourite(req, res);
  });

  return router;
};
