
const Validator = require('validator');
import isEmpty from '../../utils';

module.exports = function validateVerificationCode(data) {
    let errors = {};
    data.activationCode = !isEmpty(data.activationCode) ? data.activationCode : '';

    if(Validator.isEmpty(data.activationCode)) {
        errors.activationCode = 'Activation code is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}