import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timesstamp';

const favouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
});
favouriteSchema.plugin(timestampPlugin);

const Favourite = model('Favorite', favouriteSchema);

export default Favourite;
