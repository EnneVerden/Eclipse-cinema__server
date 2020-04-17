const UserRepository = require("../repositories/user");

const User = new UserRepository();

class UserService {
  async createUser(userData) {
    return await User.createUser(userData);
  }

  async getUser(searchData) {
    return await User.getUser(searchData);
  }

  async getUsers(searchData) {
    return await User.getUsers(searchData);
  }
}

module.exports = UserService;
