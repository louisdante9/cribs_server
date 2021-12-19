import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const visitSchema = new Schema({
  amount: { type: Number, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  apartment: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }],
});
visitSchema.plugin(timestampPlugin);
module.exports = model('Visit', visitSchema);
