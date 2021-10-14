import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import timestampPlugin from './plugin/timestamp';

const apartmentSchema = new Schema({
  propertyName: { type: String, required: true },
  propertyGroup: { type: String, required: true },
  propertyType: { type: String, required: true },
  privacyType: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  noOfRooms: { type: Number, required: true },
  noOfBaths: { type: Number, required: true },
  noOfguest: { type: Number, required: true },
  amenities: { type: String, required: true },
  booked: { type: Boolean, default: false },
  pricePerNight: { type: Number, required: true },
  agentDiscount: { type: Number, required: true },
  numberUsersOFvisits: { type: Number },
  img: [{ type: String }],
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
apartmentSchema.plugin(timestampPlugin);
apartmentSchema.plugin(mongoosePaginate);

module.exports = model('Apartment', apartmentSchema);
