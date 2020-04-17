const UserService = require("../services/user");
const toJSON = require("../methods/toJSON");

const User = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await User.getUsers();

    res.status(201).send(toJSON({ users }));
  }
}

module.exports = UserController;
