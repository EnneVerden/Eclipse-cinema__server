const User = require("../models/user");

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  getUser(searchData) {
    return User.findOne(searchData).populate("rolesId", { _id: 0 });
  }
}

module.exports = UserRepository;
