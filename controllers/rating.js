import Rating from '../models/rating';
import Apartment from '../models/apartment';
import User from '../models/user';
import { logger } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const createRating = async (req, res) => {
  try {
    const { rating, apartmentId, userId } = req.body;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    const apartment = await Apartment.findById({ _id: apartmentId });
    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const instance = new Rating({
      apartmentId,
      userId,
      rating,
    });
    const newRating = await instance.save();
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
  try {
    const ratings = await Rating.find({});
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
