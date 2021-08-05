/* eslint-disable consistent-return */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import timestampPlugin from './plugin/timesstamp';

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
  },
  activationCode: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
});

const SALT_WORK_FACTOR = 10;

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    // eslint-disable-next-line consistent-return
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
// eslint-disable-next-line func-names
userSchema.methods.validPassword = function (password) {
  if (!password || !this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(timestampPlugin);

const User = model('User', userSchema);
export default User;
