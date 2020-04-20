const Joi = require("@hapi/joi");

module.exports = Joi.object({
  avatar: Joi.string().min(1),
  fullName: Joi.string().min(1),
  password: Joi.string().min(6).max(30),
  movieId: Joi.string().min(1),
  deletedMovie: Joi.string().min(1),
});
