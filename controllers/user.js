import { v4 as uuidv4 } from 'uuid';
import gravatar from 'gravatar';
import rcg from 'referral-code-generator';
import User from '../models/user';
import Apartment from '../models/apartment';
import { generateToken, logger } from '../utils';

export const login = async (userCred, res, role) => {
  const { email, password } = userCred;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).send({ message: 'Failed to authenticate user' });
    }
    if (!user.validPassword(password)) {
      return res.status(401).send({ message: 'Failed to authenticate user' });
    }

    if (!user.activated) {
      return res.status(401).send({
        error: 'You need to activate account pls contact admin for help',
      });
    }

    // We will check the role
    if (user.role !== role) {
      return res.status(403).json({
        error: {
          message: 'Please make sure you are logging in from the right portal.',
          success: false,
        },
      });
    }
    return res.status(200).json({
      token: generateToken({
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
        activated: user.activated,
        avatar: user.avatar,
      }),
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const register = async (userCred, res) => {
  const { email, role } = userCred;
  let userObj;
  const userFound = await User.findOne({ email: email.trim().toLowerCase() });
  if (userFound) {
    return res.status(409).send({ error: 'sorry email already exist' });
  }
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  if (role === 'admin') {
    userObj = {
      ...userCred,
      activated: true,
      activationCode: uuidv4(),
      avatar,
    };
  } else if (role === 'agent') {
    userObj = {
      ...userCred,
      referralCode: rcg.alpha('lowercase', 12),
      activationCode: uuidv4(),
      avatar,
    };
  } else {
    userObj = {
      ...userCred,
      activationCode: uuidv4(),
      avatar,
    };
  }
  const instance = new User(userObj);
  try {
    const user = await instance.save();
    return res.status(200).json({
      message: 'User was created successfully',
      user,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
/**
 * active user with uuid verification
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const activateUser = async (req, res) => {
  const { activationCode } = req;

  try {
    const user = await User.findOne({ activationCode });
    if (!user) {
      return res.status(400).send({ error: 'activate code given is invalid' });
    }
    const query = {
      activationCode,
    };
    const userObj = {
      $set: {
        activated: true,
      },
    };
    const verifiedUser = await User.findOneAndUpdate(query, userObj, {
      new: true,
    });

    return res.status(201).send({
      message: 'Token was verified successfully',
      verifiedUser,
      token: generateToken({
        // eslint-disable-next-line no-underscore-dangle
        id: verifiedUser._id,
        email: verifiedUser.email,
        firstname: verifiedUser.firstname,
        lastname: verifiedUser.lastname,
        username: verifiedUser.username,
        phone: verifiedUser.phone,
        role: verifiedUser.role,
        status: verifiedUser.status,
        avatar: verifiedUser.avatar,
      }),
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * get all users
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const clients = await users.filter((user) => user.role !== 'admin');
    return res
      .status(200)
      .json({ clients, message: 'users fetched successfully' });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * get one user
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id.toLowerCase() });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(201).send({ user, message: 'user found' });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * delete a user
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'parcel does not exist' });
    }
    const delUser = await User.remove({ _id: req.params.id });
    return res.status(202).send({ message: 'User deleted', delUser });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * update a user
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const updateUser = async (req, res) => {
  const { firstname, lastname, phone } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    const query = {
      _id: req.params.id,
    };
    const userObj = {
      $set: {
        firstname,
        lastname,
        phone,
      },
    };
    const updatedUser = await User.findOneAndUpdate(query, userObj, {
      new: true,
    });

    return res
      .status(201)
      .send({ message: 'updated was successfully', updatedUser });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
