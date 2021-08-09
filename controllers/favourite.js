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
        .status(404)
        .send({ error: 'apartment already in your favourite' });
    }
    const instance = new Favourite({
      user: userId,
      apartment: apartmentId,
    });
    const newFavourite = await instance.save();

    res.status(200).json({ newFavourite });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
};

export const getAllFavourites = async (req, res) => {
  try {
    const userId = req.body;
    const favourites = await Favourite.findOne({ userId });
    if (!favourites) {
      return res.status(404).send({ error: 'You have no favourite' });
    }
    res.send(favourites);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
};

export const deleteFavourite = async (req, res) => {
  try {
    const favourited = await Favourite.findById(req.params.id);
    if (favourited) {
      const deleted = await favourited.remove();
      return res.send({ message: 'Favourite Deleted', favourited: deleted });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
};
