/* eslint-disable import/prefer-default-export */
import schedule from 'node-schedule';
import moment from 'moment';
import Booking from '../models/booking';
import Apartment from '../models/apartment';

const activateBookings = async (today) => {
  const bookings = await Booking.find({}).where('startDate').equals(today);
  bookings.forEach(async ({ apartmentId }) => {
    const filter = { _id: apartmentId };
    const update = { booked: true };
    await Apartment.findOneAndUpdate(filter, update)
      .where('booked')
      .equals(false);
  });
};

const disableBookings = async (today) => {
  const bookings = await Booking.find({}).where('endDate').equals(today);
  bookings.forEach(async ({ apartmentId }) => {
    const filter = { _id: apartmentId };
    const update = { booked: false };
    await Apartment.findOneAndUpdate(filter, update)
      .where('booked')
      .equals(true);
  });
};

export const job = async () =>
  schedule.scheduleJob('0 12 * * *', async () => {
    const today = moment();
    await disableBookings(today);
    await activateBookings(today);
  });
