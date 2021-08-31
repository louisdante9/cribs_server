import {
  getAllFavourites,
  createFavourite,
  deleteFavourite,
  getAllUserFavourites,
} from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    await getAllFavourites(req, res);
  });
  router.get('/:userId', async (req, res) => {
    await getAllUserFavourites(req, res);
  });
  router.post('/add-favourite', async (req, res) => {
    await createFavourite(req, res);
  });
  router.delete('/:userId/del/:apartmentId', async (req, res) => {
    await deleteFavourite(req, res);
  });

  return router;
};
