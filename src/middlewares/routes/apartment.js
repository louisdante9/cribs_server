import {
  createApartment,
  getOneApartment,
  getAllApartments,
  updateApartment,
  deleteApartment,
} from '../../controllers';

module.exports = (express) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    await getAllApartments(req, res);
  });
  router.post('/', async (req, res) => {
    await createApartment(req, res);
  });
  router.get('/:userId/listing/:apartmentId', async (req, res) => {
    await getOneApartment(req, res);
  });
  router.put('/:id', async (req, res) => {
    await updateApartment(req, res);
  });
  router.delete('/:id', async (req, res) => {
    await deleteApartment(req, res);
  });

  return router;
};
