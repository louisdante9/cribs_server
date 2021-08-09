import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const favouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
});
favouriteSchema.plugin(timestampPlugin);
module.exports = model('Favorite', favouriteSchema);

