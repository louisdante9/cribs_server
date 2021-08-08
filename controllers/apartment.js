import Apartment from '../models/apartment';
import History from '../models/history';
import { logger } from '../utils';

/**
 * create apartment
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const createApartment = async (req, res) => {
  const {
    img,
    apartmentName,
    apartmentType,
    description,
    address,
    location,
    noOfRooms,
    fittings,
    booked,
    price,
  } = req.body;
  try {
    const instance = new Apartment({
      img,
      apartmentName,
      apartmentType,
      description,
      address,
      location,
      noOfRooms,
      fittings,
      booked,
      price,
    });
    const apartment = await instance.save();
    return res
      .status(200)
      .json({ message: 'apartment was created successfully', apartment });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * get all apartment
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    return res
      .status(200)
      .json({ apartments, message: 'apartments fetched successfully' });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
/**
 * get one apartment
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const getOneApartment = async (req, res) => {
  const { userid } = req.body;
  try {
    const apartment = await Apartment.findOne({ _id: req.params.id });
    if (!apartment) {
      return res.status(404).send({ error: 'No apartment found' });
    }
    const visits = await History.find({})
      .where('apartment')
      // eslint-disable-next-line no-underscore-dangle
      .equals(apartment._id)
      .where('user')
      // eslint-disable-next-line no-underscore-dangle
      .equals(userid);

    return res.status(200).json({
      message: 'apartment fetched successfully',
      apartment: { ...apartment, visits: visits.length },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * update an apartment
 * @param {any} req object
 * @param {any} res object
 * @return {void}
 */
export const updateApartment = async (req, res) => {
  const {
    apartmentName,
    apartmentType,
    description,
    address,
    location,
    noOfRooms,
    fittings,
    booked,
    price,
  } = req.body;
  try {
    const apartment = await Apartment.findOne({ _id: req.params.apartmentId });
    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }

    const query = {
      _id: req.params.apartmentId,
    };
    const userObj = {
      $set: {
        apartmentName,
        apartmentType,
        description,
        address,
        location,
        noOfRooms,
        fittings,
        booked,
        price,
      },
    };
    const updatedApartment = await Apartment.findOneAndUpdate(query, userObj, {
      new: true,
    });

    return res
      .status(201)
      .send({ message: 'updated was successfully', updatedApartment });
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
export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      res.status(404).send({ error: 'apartment not found' });
    }
    const delApartment = await Apartment.remove({ _id: req.params.id });
    return res.status(202).send({ message: 'Apartment deleted', delApartment });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
