/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Favourite from '../models/favourite';
import Apartment from '../models/apartment';
import { logger } from '../utils';

export const createFavourite = async (req, res) => {
  try {
    const { apartmentId, userId } = req.body;
    const apartment = await Apartment.findById({ _id: apartmentId });

    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const liked = await Favourite.find({ user: userId });
    if (liked.length > 0) {
      return res.status(404).send({ error: 'apartment already rated by user' });
    }
    const instance = new Favourite({
      user: userId,
      apartment: apartmentId,
    });
    const newFavourite = await instance.save();

    res.status(200).json({ newFavourite });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user._id });
    res.send(favourites);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
