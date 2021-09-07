import Joi from '@hapi/joi';

const authUserSchema = Joi.object({
  email: Joi.string().allow(null, '').email().required().messages({
    'string.email': '"Main contact email" is not a valid email',
  }),
  password: Joi.string().required(),
});

const createUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  username: Joi.string(),
  email: Joi.string().allow(null, '').email().required().messages({
    'string.email': '"Main contact email" is not a valid email',
  }),
  role: Joi.string(),
  password: Joi.string().required(),
  phone: Joi.string().regex(/^\d{11}$/),
  activated: Joi.boolean(),
  dob: Joi.string(),
  country: Joi.string(),
  state: Joi.string(),
  age: Joi.number(),
  referralCode: Joi.string(),
  activationCode: Joi.string(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  organisationTicker: Joi.string()
    .regex(/^[A-Z-]+$/)
    .required(),
  investmentStartDate: Joi.date().iso().required(),
  investmentEndDate: Joi.date()
    .iso()
    .allow(null)
    .min(Joi.ref('investmentStartDate'))
    .messages({
      'date.min': 'Investment end date cannot be less than start date',
    }),
  status: Joi.boolean().required(),
  mainContactName: Joi.string().required(),
  mainContactPhone: Joi.string()
    .regex(/^\d{10}$/)
    .required(),
  mainContactEmail: Joi.string().allow(null, '').email().required().messages({
    'string.email': '"Main contact email" is not a valid email',
  }),
});

module.exports = { createUserSchema, updateUserSchema, authUserSchema };
