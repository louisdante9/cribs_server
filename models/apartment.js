import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timesstamp';

const apartmentSchema = new Schema({
  apartmentName: { type: String, required: true },
  apartmentType: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true, default: 'pending' },
  noOfRooms: { type: Number, required: true },
  fittings: { type: String, required: true },
  booked: { type: String },
  price: { type: Number, required: true },
  numberOFvisits: { type: String },
  img: { type: String, required: true },
  // user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  // ratings: [{type: Schema.Types.ObjectId, ref: 'User'}],
});
apartmentSchema.plugin(timestampPlugin);
module.exports = model('Apartment', apartmentSchema);
