import Apartment from '../models/apartment';
import Payment from '../models/payment';
import { logger } from '../utils';

export const createPayment = async (req, res) => {
  try {
    const { apartmentId, userId, amount } = req.body;
    const apartment = await Apartment.findById({ _id: apartmentId });

    if (!apartment) {
      return res.status(404).send({ error: 'Apartment not found' });
    }
    const instance = new Payment({
      user: userId,
      apartment: apartmentId,
      amount,
    });
    const newPayment = await instance.save();
    return res
      .status(200)
      .json({ message: 'Payment successfully', newPayment });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getAllUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ user: userId }).populate('apartment');
    if (!payments) {
      return res.status(404).send({ error: 'You have no payment' });
    }
    return res.status(200).send({
      message: 'payments fetched successfully',
      payments,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

export const getOneUserPayment = async (req, res) => {
  try {
    const { userId, apartmentId } = req.params;
    const apartment = await Apartment.findById({ _id: apartmentId });
    if (!apartment) {
      return res.status(404).send({ error: 'apartment not found' });
    }
    const payment = await Payment.find({})
      .where('user')
      .equals(userId)
      .where('apartment')
      .equals(apartmentId)
      .populate('apartment');
    return res.status(200).send({
      message: 'payments fetched successfully',
      payment,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};
