const UserRepository = require("../repositories/user");
const MovieRepository = require("../repositories/movie");
const DeletedUserRepository = require("../repositories/deletedUser");
const Hash = require("../classes/hash");
const WrongDataError = require("../errors/wrong-data");

const User = new UserRepository();
const Movie = new MovieRepository();
const DeletedUser = new DeletedUserRepository();
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

  async updateUser(user, data) {
    if (data.movieId) {
      const movie = await Movie.getMovie({ _id: data.movieId });

      if (user.moviesId.some((item) => item._id == data.movieId)) {
        throw new WrongDataError("You already have this movie!");
      }

      await User.addUserMovie({ _id: user._id }, data.movieId);

      return movie;
    } else if (data.deletedMovie) {
      const movie = await Movie.getMovie({ _id: data.deletedMovie });

      if (!user.moviesId.some((item) => item._id == data.deletedMovie)) {
        throw new WrongDataError("You don't have this movie!");
      }

      await User.removeUserMovie({ _id: user._id }, movie._id);

      return movie;
    } else if (data.password) {
      const result = await compare(data.password, user.password);

      if (result) {
        delete data.password;
      } else {
        data.password = await hash(data.password);
      }

      return await User.updateUser({ _id: user._id }, data);
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

    await DeletedUser.saveDeletedUsers(deletedUsers);
    await User.removeUsers();

    const deletedUsersId = deletedUsers.map((delUser) => delUser._id);

    return deletedUsersId;
  }
}

module.exports = UserService;
