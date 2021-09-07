import { Schema, model } from 'mongoose';
import timestampPlugin from './plugin/timestamp';

const historySchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  apartment: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }],
  transactionId: { type: String, required: true },
  startDate: Date,
  endDate: Date,
});
historySchema.plugin(timestampPlugin);
module.exports = model('History', historySchema);
