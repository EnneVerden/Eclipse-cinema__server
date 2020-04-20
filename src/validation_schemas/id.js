const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.string().min(1).required(),
});
