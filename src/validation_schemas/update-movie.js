const Joi = require("@hapi/joi");

module.exports = Joi.object({
  name: Joi.string().min(1),
  poster: Joi.string().min(1),
  description: Joi.string().min(1),
  tags: Joi.array().items(Joi.string()).min(1),
  startDate: Joi.string().pattern(
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  ),
  endDate: Joi.string().pattern(
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  ),
  ticketPrice: Joi.number().min(1),
});
