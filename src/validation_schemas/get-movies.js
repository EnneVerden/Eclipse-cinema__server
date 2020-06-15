const Joi = require("@hapi/joi");

module.exports = Joi.object({
  movieName: Joi.string(),
  page: Joi.number(),
  tag: Joi.string(),
});
