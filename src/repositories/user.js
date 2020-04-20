const User = require("../models/user");

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  getUser(searchData) {
    return User.findOne(searchData, { __v: 0 })
      .populate("rolesId")
      .populate("moviesId", { __v: 0 });
  }

  getUsers(searchData) {
    return User.find(searchData, { password: 0, __v: 0 })
      .populate("rolesId")
      .populate("moviesId", { tagsId: 0, description: 0, __v: 0 });
  }

  getDeletedUsers(searchData) {
    return User.find(searchData).select({ __v: 0, accountStatus: 0 });
  }

  updateUser(searchData, dataForUpdating) {
    return User.findOneAndUpdate(searchData, dataForUpdating, {
      new: true,
      fields: Object.keys(dataForUpdating).filter(
        (field) => field !== "password"
      ),
    }).select({ _id: 0 });
  }

  addUserMovie(searchData, movieId) {
    return User.updateOne(searchData, { $push: { moviesId: movieId } });
  }

  removeUserMovie(searchData, movieId) {
    return User.updateOne(searchData, { $pull: { moviesId: movieId } });
  }

  removeUsers() {
    return User.remove({ accountStatus: "deletion" });
  }
}

module.exports = UserRepository;
