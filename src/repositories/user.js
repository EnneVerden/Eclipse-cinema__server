const User = require("../models/user");

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  getUser(searchData) {
    return User.findOne(searchData, { __v: 0 })
      .populate("roles")
      .populate("tickets", { __v: 0 });
  }

  getUsers(searchData, returnInfo) {
    return User.find(searchData, { password: 0, __v: 0 })
      .populate("roles")
      .populate("tickets", { tags: 0, description: 0, __v: 0 });
  }

  getDeletedUsers(searchData) {
    return User.find(searchData).select({ __v: 0, accountStatus: 0 });
  }

  getUsersMovies() {
    return User.find({ tickets: { $exists: true, $ne: [] } })
      .populate("tickets", "movieName poster startDate ticketPrice")
      .select("email avatar tickets");
  }

  updateUser(searchData, dataForUpdating) {
    return User.findOneAndUpdate(searchData, dataForUpdating, {
      new: true,
      fields: Object.keys(dataForUpdating).filter(
        (field) => field !== "password"
      ),
    }).select({ _id: 0 });
  }

  addUserMovie(searchData, movie, userBalance) {
    return User.updateOne(searchData, {
      $push: { tickets: movie._id },
      balance: userBalance - movie.ticketPrice,
    });
  }

  removeUserMovie(searchData, movieId) {
    return User.updateOne(searchData, { $pull: { tickets: movieId } });
  }

  removeUsers() {
    return User.remove({ accountStatus: "deletion" });
  }
}

module.exports = UserRepository;
