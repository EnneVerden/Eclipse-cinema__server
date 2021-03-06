const UserService = require("../services/user");
const toJSON = require("../methods/toJSON");

const User = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await User.getUsers();

    res.status(201).send(toJSON({ users }));
  }

  async getUsersMovies(req, res) {
    const orders = await User.getUsersMovies();

    res.status(201).send(toJSON({ orders }));
  }

  async updateUser(req, res) {
    const userInfo = await User.updateUser(
      req.user,
      req.body,
      req.file ? req.file.path : null
    );

    res.status(201).send(toJSON({ userInfo }));
  }

  async sendRemoveRequest(req, res) {
    const status = await User.sendRemoveRequest(req.user);

    res.status(201).send(toJSON({ status }));
  }

  async removeUsers(req, res) {
    const deletedUsersId = await User.removeUsers();

    res.status(201).send(toJSON({ deletedUsersId }));
  }

  async removeUser(req, res) {
    const deletedUserId = await User.removeUser({
      deletedUserId: req.params.id,
    });

    res.status(201).send(toJSON({ deletedUserId }));
  }

  async replenishBalance(req, res) {
    const balance = await User.replenishBalance(req.user);

    res.status(201).send(toJSON({ balance }));
  }
}

module.exports = UserController;
