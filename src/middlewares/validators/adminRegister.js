/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from '../../utils';

module.exports = function validateRegisterInput(data) {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.confirmPassword, { min: 6, max: 30 })) {
    errors.confirmPassword = 'Password must have 6 chars';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Password and Confirm Password must match';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
