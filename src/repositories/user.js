const User = require("../models/user");

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  getUser(searchData, userLimit, rolesIdLimit, moviesIdLimit) {
    return User.findOne(searchData, userLimit)
      .populate("rolesId", rolesIdLimit)
      .populate("moviesId", moviesIdLimit);
  }

  getUsers(searchData, userLimit, rolesIdLimit, moviesIdLimit) {
    return User.find(searchData, userLimit)
      .select({ password: 0, __v: 0 })
      .populate("rolesId", rolesIdLimit)
      .populate("moviesId", moviesIdLimit);
  }

  getDeletedUsers(searchData) {
    return User.find(searchData).select({ __v: 0, accountStatus: 0 });
  }

  updateUser(searchData, dataForUpdating) {
    return User.updateMany(searchData, dataForUpdating);
  }

  removeUsers() {
    return User.remove({ accountStatus: "deletion" });
  }
}

module.exports = UserRepository;
