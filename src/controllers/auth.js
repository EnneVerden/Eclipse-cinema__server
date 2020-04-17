const UserService = require("../services/user");
const AuthenticationError = require("../errors/authentication");

const User = new UserService();

class AuthController {
  async registration(req, res) {
    const existingUser = await User.getUser({ email: req.body.email });

    if (existingUser) {
      throw new AuthenticationError("User with this email is already exists!");
    }

    const user = await User.createUser(req.body);

    res.status(201).send(Object.assign(user, { password: "" }));
  }
}

module.exports = AuthController;
