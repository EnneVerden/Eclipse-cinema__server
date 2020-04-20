const Joi = require("@hapi/joi");

module.exports = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(6)
    .max(30)
    .required(),
});
