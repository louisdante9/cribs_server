import expressJoi from 'express-joi-validation';
import {
  login,
  register,
  getAllUsers,
  getOneUser,
  updateUser,
  activateUser,
} from '../../controllers';
import { user as validate } from '../validators';

const validator = expressJoi.createValidator({
  passError: true,
});

module.exports = (express) => {
  const router = express.Router();

  router.post(
    '/admin/login',
    validator.body(validate.authUserSchema),
    async (req, res) => {
      await login(req.body, res, 'admin');
    }
  );

  router.post(
    '/admin/register',
    validator.body(validate.createUserSchema),
    async (req, res) => {
      await register(req.body, res, 'admin');
    }
  );
  router.get('/admin/get-users', async (req, res) => {
    await getAllUsers(req, res);
  });
  router.get('/get-user/:id', async (req, res) => {
    await getOneUser(req, res);
  });
  router.put('/:id', async (req, res) => {
    await updateUser(req, res);
  });

  router.post(
    '/register',
    validator.body(validate.createUserSchema),
    async (req, res) => {
      await register(req.body, res, 'user');
    }
  );
  router.post('/login', async (req, res) => {
    await login(req.body, res, 'user');
  });

  router.patch('/activate', async (req, res) => {
    await activateUser(req, res);
  });
  return router;
};
