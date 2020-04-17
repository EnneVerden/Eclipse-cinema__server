const UserService = require("../services/user");
const AuthenticationError = require("../errors/authentication");

const User = new UserService();

class AuthController {
  async login(req, res) {
    res.status(201).send(Object.assign(req.user, { password: "" }));
    res.send();
  }

  async registration(req, res) {
    const existingUser = await User.getUser({ email: req.body.email });

    if (existingUser) {
      throw new AuthenticationError("User with this email is already exists!");
    }

    const user = await User.createUser(req.body);

    await req.login(user, (error) => {
      if (error) {
        throw new AuthenticationError(error);
      }

      res.status(201).send(Object.assign(user, { password: "" }));
    });
  }
}

module.exports = AuthController;
