const User = require("../models/user");

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  getUser(searchData) {
    return User.findOne(searchData).populate("rolesId", { _id: 0 });
  }

  getUsers(searchData) {
    return User.find(searchData)
      .select({ password: 0, __v: 0 })
      .populate("rolesId", { _id: 0 });
  }

  getDeletedUsers(searchData) {
    return User.find(searchData).select({ __v: 0, accountStatus: 0 });
  }

  removeUsers() {
    return User.deleteMany({ accountStatus: "deletion" });
  }
}

module.exports = UserRepository;
