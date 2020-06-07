const UserRepository = require("../repositories/user");
const MovieRepository = require("../repositories/movie");
const Hash = require("../classes/hash");
const WrongDataError = require("../errors/wrong-data");

const User = new UserRepository();
const Movie = new MovieRepository();
const hash = new Hash().hash;
const compare = new Hash().compare;

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

  async getUsersMovies() {
    return await User.getUsersMovies();
  }

  async updateUser(user, data, avatarPath) {
    if (avatarPath !== null) {
      await User.updateUser({ _id: user._id }, { avatar: avatarPath });

      return { avatar: avatarPath };
    } else if (data.movieId) {
      const movie = await Movie.getMovie({ _id: data.movieId });

      if (user.tickets.some((item) => item._id == data.movieId)) {
        throw new WrongDataError("You already have this movie!");
      }

      if (user.balance < movie.ticketPrice) {
        throw new WrongDataError("You do not have enough funds!");
      }

      await User.addUserMovie({ _id: user._id }, movie, user.balance);

      return movie;
    } else if (data.deletedMovieId) {
      const movie = await Movie.getMovie({ _id: data.deletedMovieId });

      if (!user.tickets.some((item) => item._id == data.deletedMovieId)) {
        throw new WrongDataError("You don't have this movie!");
      }

      await User.removeUserMovie({ _id: user._id }, movie._id);

      return movie;
    } else if (data.newPassword && data.oldPassword) {
      if (!data.oldPassword || !data.newPassword) {
        throw new WrongDataError("Enter data to change!");
      }

      const result = await compare(data.oldPassword, user.password);

      if (result) {
        const newPassword = await hash(data.newPassword);
        await User.updateUser({ _id: user._id }, { password: newPassword });

        return { password: true };
      } else {
        throw new WrongDataError("Old password is incorrect!");
      }
    } else {
      const result = await compare((data.oldPassword = "none"), user.password);

      if (result) {
        return await User.updateUser({ _id: user._id }, data);
      } else {
        throw new WrongDataError("Old password is incorrect!");
      }
    }
  }

  async sendRemoveRequest(user) {
    if (user.accountStatus === "active") {
      return await User.updateUser(
        { _id: user._id },
        { accountStatus: "deletion" }
      );
    } else if (user.accountStatus === "deletion") {
      return await User.updateUser(
        { _id: user._id },
        { accountStatus: "active" }
      );
    }
  }

  async removeUsers() {
    const deletedUsers = await User.getDeletedUsers({
      accountStatus: "deletion",
    });

    await User.removeUsers();

    const deletedUsersId = deletedUsers.map((delUser) => delUser._id);

    return deletedUsersId;
  }

  async removeUser(searchData) {
    const deletedUser = await User.getDeletedUsers({
      accountStatus: "deletion",
      _id: searchData.deletedUserId,
    });

    await User.removeUser({
      accountStatus: "deletion",
      _id: searchData.deletedUserId,
    });

    return deletedUser[0]._id;
  }

  async replenishBalance(user) {
    return await User.updateUser(
      { _id: user._id },
      { balance: user.balance + 5 }
    );
  }
}

module.exports = UserService;
