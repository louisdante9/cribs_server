import Review from '../models/review';
import Apartment from '../models/apartment';
import { logger } from '../utils';

export const createReview = async (req, res) => {
  try {
    const { apartmentId, userId, review } = req.body;
    const apartment = await Apartment.findById({ _id: apartmentId });

    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const rated = await Review.find({ user: userId });
    if (rated.length > 0) {
      return res
        .status(404)
        .send({ error: 'apartment already reviewed by user' });
    }
    const instance = new Review({
      user: userId,
      apartment: apartmentId,
      review,
    });
    const newReview = await instance.save();
    if (newReview) {
      apartment.reviews.push(instance);
      apartment.save();
    }
    return res
      .status(200)
      .json({ message: 'Review added successfully', newReview });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllReviews = async (req, res) => {
  const { apartmentId } = req.body;
  try {
    const ratings = await Review.find({})
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
