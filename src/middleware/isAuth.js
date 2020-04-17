const AuthenticationError = require("../errors/authentication");

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new AuthenticationError("You aren't authenticated!"));
  }
};
