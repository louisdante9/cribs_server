import { v4 as uuidv4 } from 'uuid';
import gravatar from 'gravatar';
import User from '../models/user';
import Apartment from '../models/apartment';
import { generateToken } from '../utils';

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

    if (!user.status) {
      return res
        .status(401)
        .send({ message: 'You need to active account with token' });
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
        status: user.status,
        avatar: user.avatar,
        totalInvestment: user.totalInvestment,
        earnedTotal: user.earnedTotal,
        accountBal: user.accountBal,
      }),
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const register = async (userCred, res, role) => {
  const { email } = userCred;
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
      role,
      status: true,
      uuidv4: uuidv4(),
      avatar,
    };
  } else {
    userObj = {
      ...userCred,
      role,
      uuidv4: uuidv4(),
      avatar,
    };
  }
  const instance = new User(userObj);
  try {
    const user = await instance.save();
    if (!user) {
      return res.status(500).send({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: 'User was created successfully' });
  } catch (error) {
    return res.status(400).send({ error });
  }
};
/**
 * active user with uuid verification
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const activateUser = async (req, res) => {
  const { activationCode } = req.body;

  const user = await User.findOne({ uuidv4: activationCode });
  if (!user) {
    return res.status(400).send({ error: 'activate code given is invalid' });
  }
  const query = {
    uuidv4: activationCode,
  };
  const userObj = {
    $set: {
      status: true,
    },
  };
  const verifiedUser = await User.findOneAndUpdate(query, userObj, {
    new: true,
  });
  if (verifiedUser) {
    res.status(201).send({
      message: 'Token was verified successfully',
      verifiedUser,
      token: generateToken({
        id: verifiedUser._id,
        email: verifiedUser.email,
        firstname: verifiedUser.firstname,
        lastname: verifiedUser.lastname,
        username: verifiedUser.username,
        role: verifiedUser.role,
        status: verifiedUser.status,
        avatar: verifiedUser.avatar,
      }),
    });
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
    const clients = await users.filter((user) => user.role != 'admin');
    return res
      .status(200)
      .json({ clients, message: 'users fetched successfully' });
  } catch (error) {
    res.status(400).send({ error });
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
    res.status(201).send({ user, message: 'user found' });
  } catch (error) {
    res.status(400).send({ error });
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
      res.status(404).send({ messsage: 'parcel does not exist' });
    }
    const delUser = await User.remove({ _id: req.params.id });
    if (delUser) {
      res.status(202).send({ message: 'User deleted', parcel });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

/**
 * update a user
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const updateUser = async (req, res) => {
  const { accountBal, earnedTotal, totalInvestment, planType } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const query = {
      _id: req.params.id,
    };
    const userObj = {
      $set: {
        accountBal,
        earnedTotal,
        totalInvestment,
        planType,
      },
    };
    const updatedUser = await User.findOneAndUpdate(query, userObj, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(201)
        .send({ message: 'updated was successfully', updatedUser });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};
