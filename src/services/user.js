const UserRepository = require("../repositories/user");
const DeletedUserRepository = require("../repositories/deletedUser");

const User = new UserRepository();
const DeletedUser = new DeletedUserRepository();

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
