import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const bookingSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  apartment: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }],
  startDate: Date,
  endDate: Date,
});
bookingSchema.plugin(timestampPlugin);
// create the model for transaction and expose it to our app
module.exports = model('Booking', bookingSchema);
