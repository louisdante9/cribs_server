/* eslint-disable consistent-return */
import Apartment from '../models/apartment';
import Favourite from '../models/favourite';
import { logger } from '../utils';

export const createFavourite = async (req, res) => {
  try {
    const { apartmentId, userId } = req.body;
    const apartment = await Apartment.findById({ _id: apartmentId });

    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const liked = await Favourite.find({})
      .where('user')
      .equals(userId)
      .where('apartment')
      .equals(apartmentId);

    if (liked.length > 0) {
      return res
        .status(409)
        .send({ error: 'apartment already in your favourite' });
    }
    const instance = new Favourite({
      user: userId,
      apartment: apartmentId,
    });
    const newFavourite = await instance.save();
    res
      .status(200)
      .json({ message: 'Favourite added successfully', newFavourite });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllUserFavourites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favourites = await Favourite.find({ user: userId }).populate(
      'apartment'
    );
    if (!favourites) {
      return res.status(404).send({ error: 'You have no favourite' });
    }
    return res.status(200).send({
      message: 'favourites fetched successfully',
      favourites,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({});
    return res.status(200).send({
      message: 'favourites fetched successfully',
      favourites,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const deleteFavourite = async (req, res) => {
  const { apartmentId, userId } = req.params;
  try {
    const liked = await Favourite.findOne({})
      .where('user')
      .equals(userId)
      .where('apartment')
      .equals(apartmentId);
    if (liked) {
      await Favourite.deleteOne()
        .where('user')
        .equals(userId)
        .where('apartment')
        .equals(apartmentId);
      return res.send({ message: 'Favourite Deleted', deletedFav: liked });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
