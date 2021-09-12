/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from '../../utils';

const validateVerificationCode = (data) => {
  const errors = {};
  data.activationCode = !isEmpty(data.activationCode)
    ? data.activationCode
    : '';

  if (Validator.isEmpty(data.activationCode)) {
    errors.activationCode = 'Activation code is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validateVerificationCode;
