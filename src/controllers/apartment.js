import Apartment from '../models/apartment';
import History from '../models/history';
import Rating from '../models/rating';
import Favourite from '../models/favourite';
import { logger } from '../utils';

const AGENT_DISCOUNT = 7.5;
/**
 * create apartment
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const createApartment = async (req, res) => {
  const {
    img,
    propertyName,
    propertyGroup,
    propertyType,
    privacyType,
    description,
    address,
    state,
    city,
    zipCode,
    noOfRooms,
    noOfBaths,
    noOfguest,
    amenities,
    pricePerNight,
    latitude,
    longitude,
    userId,
  } = req.body;
  try {
    const instance = new Apartment({
      img,
      propertyName,
      propertyGroup,
      propertyType,
      privacyType,
      description,
      address,
      state,
      city,
      zipCode,
      noOfRooms,
      noOfBaths,
      noOfguest,
      amenities,
      pricePerNight,
      agentDiscount: AGENT_DISCOUNT,
      latitude,
      longitude,
      userId,
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
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 2,
    };
    const ratingAvg = await Rating.aggregate([
      { $unwind: '$apartment' },
      {
        $group: {
          _id: '$apartment',
          rating: { $avg: '$rating' },
        },
      },
    ]);

    const listings = await Apartment.paginate(
      {},
      {
        offset: pageOptions.page * pageOptions.limit,
        limit: pageOptions.limit,
      }
    );
    return res.status(200).json({
      message: 'apartments fetched successfully',
      apartments: { listings, ratingAvg },
    });
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
export const getAllUserApartments = async (req, res) => {
  try {
    const { userId } = req.params;
    const listings = await Apartment.find({}).where('userId').equals(userId);
    return res.status(200).json({
      message: 'apartments fetched successfully',
      apartments: { listings },
    });
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
  const { apartmentId, userId } = req.params;
  try {
    const apartment = await Apartment.findOne({
      _id: apartmentId,
    })
      .populate('ratings', '-_id rating user')
      .populate('reviews', '-_id review user');

    if (!apartment) {
      return res.status(404).send({ message: 'No apartment found' });
    }
    const visits = await History.find({})
      .where('apartment')
      // eslint-disable-next-line no-underscore-dangle
      .equals(apartment._id)
      .where('user')
      // eslint-disable-next-line no-underscore-dangle
      .equals(userId);

    const favourite = await Favourite.find({})
      .where('apartment')
      // eslint-disable-next-line no-underscore-dangle
      .equals(apartment._id)
      .where('user')
      // eslint-disable-next-line no-underscore-dangle
      .equals(userId);

    // return console.log(favourite, 'favourite');
    const favourited = favourite.length > 0;

    return res.status(200).json({
      message: 'apartment fetched successfully',
      data: { apartment, visits: visits.length, favourited },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
};

/**
 * update an apartment
 * @param {any} req object
 * @param {any} res object
 * @return {void}
 */
export const updateApartment = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartment.findOne({ _id: id });
    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }

    const query = {
      _id: id,
    };
    const userObj = {
      $set: {
        ...req.body,
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
 * delete an apartment
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
    const delApartment = await Apartment.deleteOne({ _id: req.params.id });
    return res.status(202).send({ message: 'Apartment deleted', delApartment });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
