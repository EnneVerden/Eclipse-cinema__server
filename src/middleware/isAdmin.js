const AccessDeniedError = require("../errors/access-denied");
const InternalServerError = require("../errors/internal-server");

module.exports = async (req, res, next) => {
  try {
    let isAdmin = false;
    const roles = req.user.rolesId.map((role) => role.name);

    isAdmin = roles.some((role) => role === "admin");

    if (!isAdmin) {
      next(new AccessDeniedError("Not enough rights. Access is denied."));
    }

    next();
  } catch (error) {
    console.log(error);
    next(new InternalServerError("Internal server error. Access id denied!"));
  }
};
