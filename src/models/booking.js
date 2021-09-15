import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  apartmentId: { type: Schema.Types.ObjectId, ref: 'Apartment' },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
bookingSchema.plugin(timestampPlugin);
// create the model for transaction and expose it to our app
module.exports = model('Booking', bookingSchema);
