const Joi = require("@hapi/joi");

module.exports = Joi.object({
  avatar: Joi.string().min(1),
  fullName: Joi.string().min(1),
  email: Joi.string().trim().email(),
  newPassword: Joi.string().min(6).max(30),
  oldPassword: Joi.string().min(6).max(30),
  movieId: Joi.string().min(1),
  deletedMovieId: Joi.string().min(1),
});
