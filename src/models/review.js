import { Schema, model } from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate';
import timestampPlugin from './plugin/timestamp';

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
  review: { type: String, required: true },
});
reviewSchema.plugin(timestampPlugin);
// reviewSchema.plugin(mongoosePaginate);
module.exports = model('Review', reviewSchema);
