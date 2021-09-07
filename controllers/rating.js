import Apartment from '../models/apartment';
import Rating from '../models/rating';
// import User from '../models/user';
import { logger } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const createRating = async (req, res) => {
  try {
    const { rating, apartmentId, userId } = req.body;
    const apartment = await Apartment.findById({ _id: apartmentId });
    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const rated = await Rating.find({ user: userId });
    if (rated.length > 0) {
      return res.status(404).send({ error: 'apartment already rated by user' });
    }

    const instance = new Rating({
      user: userId,
      rating,
      apartment: apartmentId,
    });
    const newRating = await instance.save();
    if (newRating) {
      apartment.ratings.push(instance);
      apartment.save();
    }
    return res.status(200).send({
      message: 'Added Rating successfully',
      newRating,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllRating = async (req, res) => {
  const { apartmentId } = req.body;
  try {
    const ratings = await Rating.find({})
      .where('apartment')
      .equals(apartmentId);
    if (!ratings) return res.status(404).send({ error: 'no ratings found' });
    return res.status(200).send({
      message: 'rating fetched successfully',
      ratings,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
