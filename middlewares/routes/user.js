import expressJoi from 'express-joi-validation';
import { login, register } from '../../controllers';
import { user as validate } from '../validators';

const validator = expressJoi.createValidator({
  passError: true,
});
// import jwtVerify from '../utils/jwtVerify';

module.exports = (express) => {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    await login(req.body, res, 'admin');
  });

  router.post(
    '/register',
    validator.body(validate.createUserSchema),
    async (req, res) => {
      await register(req.body, res, 'admin');
    }
  );

  //   router.patch('/users/activate', async (req, res) => {
  //     const { errors, isValid } = validateVerification(req.body);
  //     if (!isValid) {
  //       return res.status(400).json(errors);
  //     }
  //     await activateUser(req, res);
  //   });

  return router;
};
