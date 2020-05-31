const Joi = require("@hapi/joi");

module.exports = Joi.object({
  movieName: Joi.string().min(1).required(),
  poster: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  startDate: Joi.string()
    .pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .required(),
  endDate: Joi.string()
    .pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .required(),
  ticketPrice: Joi.number().min(1).required(),
});
