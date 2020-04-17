const UserService = require("../services/user");

const User = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await User.getUsers();

    res.send(users);
  }
}

module.exports = UserController;
