import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import timestampPlugin from './plugin/timestamp'
const userSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    },
    
});

const SALT_WORK_FACTOR = 10;

userSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.validPassword = function(password) {
    if (!password || !this.password) {
        return false;
      }
  
      return bcrypt.compareSync(password, this.password);
  }

userSchema.plugin(timestampPlugin)

const User = model('User', userSchema);
export default User;