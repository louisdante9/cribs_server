import Apartment from '../models/apartment';
import Booking from '../models/booking';
import History from '../models/history';
import { logger } from '../utils';

/**
 * create apartment
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
// eslint-disable-next-line consistent-return
export const createBooking = async (req, res) => {
  try {
    const { apartmentId, userId, startDate, endDate, transactionId } = req.body;
    const apartment = await Apartment.findOne({ _id: apartmentId });

    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }

    const instance = new Booking({
      apartmentId,
      transactionId,
      userId,
      startDate,
      endDate,
    });
    const historyInstance = new History({
      apartmentId,
      transactionId,
      userId,
      startDate,
      endDate,
    });
    const booked = await instance.save();
    await historyInstance.save();
    if (booked) {
      apartment.bookings.push(instance);
      apartment.save();
      const booking = await Apartment.findOneAndUpdate(
        { _id: apartmentId },
        { $set: { booked: true } },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: 'apartment was created successfully',
        booking,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * check booking availability before creating a booking
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const checkBookingAvailability = async (req, res) => {
  const { apartmentId, startDate, endDate } = req.body;
  try {
    const check = await Booking.find({
      apartmentId,
      $or: [
        {
          $and: [
            { startDate: { $gte: startDate } },
            { startDate: { $lte: endDate } },
          ],
        },
        { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
      ],
    });
    console.log(check, check.length > 0, 'check');

    return res.status(200).json({
      message: 'apartments fetched successfully',
      check,
      booked: check.length > 0,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * get all Bookings as an admin
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const getAllBookingAsAdmin = async (req, res) => {
  try {
    const bookings = await Apartment.find({}).where('booked').equals(true);
    return res
      .status(200)
      .json({ message: 'apartments fetched successfully', bookings });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
/**
 * get all Bookings for an apartment
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
export const getAllAvailableBookingDate = async (req, res) => {
  const { apartmentId } = req.params;
  try {
    const bookings = await Booking.find({})
      .where('apartmentId')
      .equals(apartmentId);

    return res
      .status(200)
      .json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * update a booking
 * @param {any} req object
 * @param {any} res object
 * @return {void}
 */
export const updateBooking = async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const booking = await Booking.findOne({ _id: req.params.bookingId });
    if (!booking) {
      return res.status(404).send({ error: 'booking not found' });
    }

    const query = {
      _id: req.params.bookingId,
    };
    const userObj = {
      $set: {
        startDate,
        endDate,
      },
    };
    const updatedBooking = await Booking.findOneAndUpdate(query, userObj, {
      new: true,
    });

    return res
      .status(201)
      .send({ message: 'update was successfully', updatedBooking });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * cancel a booking
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).send({ error: 'apartment not found' });
    }
    const delBooking = await Booking.remove({ _id: req.params.id });
    if (delBooking) {
      await Apartment.findOneAndUpdate(
        { _id: booking.apartment },
        {
          $set: {
            booked: false,
          },
        },
        {
          new: true,
        }
      );
    }
    return res.status(202).send({ message: 'Booking deleted', delBooking });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * delete a booking using a crun job
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
export const deleteBookingByCrunJOb = async (req, res) => {
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
