const UserService = require("../services/user");
const toJSON = require("../methods/toJSON");

const User = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await User.getUsers();

    res.status(201).send(toJSON({ users }));
  }

  async updateUser(req, res) {
    let userInfo = null;

    await User.updateUserById(req.user, req.body);

    if (req.body.password) {
      userInfo = Object.assign(req.body, { password: "" });
    } else {
      userInfo = req.body;
    }

    res.status(201).send(toJSON(userInfo));
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
