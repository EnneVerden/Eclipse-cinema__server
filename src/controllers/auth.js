const UserService = require("../services/user");
const AuthenticationError = require("../errors/authentication");
const toJSON = require("../methods/toJSON");

const User = new UserService();

class AuthController {
  async login(req, res) {
    res.status(201).send(
      toJSON({
        auth: {
          name: "Login",
          user: Object.assign(req.user, { password: "" }),
        },
      })
    );
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

      res.status(201).send(
        toJSON({
          auth: {
            name: "Registration",
            user: Object.assign(user, { password: "" }),
          },
        })
      );
    });
  }

  logout(req, res) {
    req.logout();

    res
      .status(201)
      .send(toJSON({ auth: { name: "Logout", message: "You are logout!" } }));
  }
}

module.exports = AuthController;
