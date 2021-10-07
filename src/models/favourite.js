import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import timestampPlugin from './plugin/timestamp';

const favouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
});
favouriteSchema.plugin(timestampPlugin);
favouriteSchema.plugin(mongoosePaginate);
module.exports = model('Favorite', favouriteSchema);
