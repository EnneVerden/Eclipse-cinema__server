const UserRepository = require("../repositories/user");

const User = new UserRepository();

class UserService {
  async createUser(userData) {
    return await User.createUser(userData);
  }

  async getUser(searchData) {
    return await User.getUser(searchData);
  }
}

module.exports = UserService;
