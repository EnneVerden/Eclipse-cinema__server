const Joi = require("@hapi/joi");

module.exports = Joi.object({
  movieName: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  tags: Joi.string().required(),
  startDate: Joi.string()
    .pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .required(),
  endDate: Joi.string()
    .pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .required(),
  ticketPrice: Joi.string().min(1).required(),
});
