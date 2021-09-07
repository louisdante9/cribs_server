/* eslint-disable consistent-return */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate';
import timestampPlugin from './plugin/timestamp';

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
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    required: true,
    default: 'admin',
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
});

const SALT_WORK_FACTOR = 10;

// eslint-disable-next-line consistent-return
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
userSchema.methods.validPassword = function (password) {
  if (!password || !this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(timestampPlugin);
userSchema.plugin(mongoosePaginate);

const User = model('User', userSchema);
export default User;