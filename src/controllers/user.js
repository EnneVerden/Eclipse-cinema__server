const UserService = require("../services/user");
const toJSON = require("../methods/toJSON");

const User = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await User.getUsers();

    res.status(201).send(toJSON({ users }));
  }

  async sendRemoveRequest(req, res) {
    const status = await User.sendRemoveRequest(req.user);

    res.status(201).send(toJSON(status));
  }

  async removeUsers(req, res) {
    const users = await User.removeUsers();

    res.status(201).send(toJSON({ users }));
  }
}

module.exports = UserController;
