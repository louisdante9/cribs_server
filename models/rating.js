import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timesstamp';

const ratingSchema = new Schema({
  rating: {
    type: Number,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  apartmentId: { type: Schema.Types.ObjectId, ref: 'Apartment' },
});
ratingSchema.plugin(timestampPlugin);

const Rating = model('Rating', ratingSchema, 'ratings');

export default Rating;
