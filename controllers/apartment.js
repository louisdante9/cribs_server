import Apartment from '../models/apartment';
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
  } = req;
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
    const transactions = await Apartment.find();
    return res
      .status(200)
      .json({ transactions, message: 'apartments fetched successfully' });
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
export const getOneApartments = async (req, res) => {
  try {
    const transaction = await Apartment.findOne({
      _id: req.params.id,
    }).populate('ratings');
    if (!transaction) {
      return res.status(404).send({ message: 'No apartment found' });
    }
    return res
      .status(200)
      .json({ transaction, message: 'apartment fetched successfully' });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: 'something went wrong' });
  }
};

/**
 * update an apartment
 * action can only be done by admin
 * @param {any} req request object
 * @param {any} res response object
 * @return {void}
 */
// export const updateTransaction = async (req, res) => {
//   let { btcAmt, payment, gains, userId } = req.body;
//   userId = userId[0]._id;
//   try {
//     const transaction = await Transaction.findOne({
//       _id: req.params.id,
//     }).populate('userId');
//     if (!transaction) {
//       return res.status(404).send({ message: 'transaction not found' });
//     }
//     const query = {
//       _id: req.params.id,
//     };
//     const transObj = {
//       $set: {
//         status: 'approved',
//       },
//     };
//     const updateTransaction = await Transaction.findOneAndUpdate(
//       query,
//       transObj,
//       { new: true }
//     );
//     if (updateTransaction) {
//       res
//         .status(201)
//         .send({ message: 'updated was successfully', updateTransaction });
//       try {
//         const user = await User.findOne({ _id: userId });
//         if (!user) {
//           return res.status(400).send({ message: 'Bad request' });
//         }
//         const userObj = {
//           $set: {
//             totalInvestment: Number(user.totalInvestment) + Number(btcAmt),
//             accountBal: Number(user.accountBal) - Number(payment),
//             earnedTotal: Number(user.earnedTotal) + Number(gains),
//           },
//         };
//         const updateUser = await User.findOneAndUpdate(
//           { _id: userId },
//           userObj,
//           { new: true }
//         );
//         if (!updateUser) {
//           return res.status(400).send({ message: 'Bad request' });
//         }
//       } catch (error) {
//         res.status(400).send({ error });
//       }
//     }
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// };
