import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const apartmentSchema = new Schema({
  apartmentName: { type: String, required: true },
  apartmentType: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  noOfRooms: { type: Number, required: true },
  fittings: { type: String, required: true },
  booked: { type: Boolean, default: false },
  price: { type: Number, required: true },
  numberUsersOFvisits: { type: Number },
  img: { type: String, required: true },
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
});
apartmentSchema.plugin(timestampPlugin);
module.exports = model('Apartment', apartmentSchema);
