const Joi = require("@hapi/joi");

module.exports = Joi.object({
  page: Joi.number(),
  tag: Joi.string(),
});
