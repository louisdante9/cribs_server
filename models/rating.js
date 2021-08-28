import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const ratingSchema = new Schema({
  rating: {
    type: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
});
ratingSchema.plugin(timestampPlugin);

const Rating = model('Rating', ratingSchema);

export default Rating;
