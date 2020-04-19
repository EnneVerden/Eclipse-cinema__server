const UserRepository = require("../repositories/user");
const DeletedUserRepository = require("../repositories/deletedUser");
const Hash = require("../classes/hash");

const User = new UserRepository();
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

  async updateUser(currentUser, data) {
    const user = await User.getUser({ _id: currentUser._id });

    if (data.password) {
      const result = await compare(data.password, user.password);

      if (result && Object.keys(data).length > 1) {
        delete data.password;
      } else if (result) {
        return false;
      } else {
        data.password = await hash(data.password);
      }
    }

    return await User.updateUser({ _id: currentUser._id }, data);
  }

  async sendRemoveRequest(user) {
    if (user.accountStatus === "active") {
      await User.updateUser({ _id: user._id }, { accountStatus: "deletion" });
      return { accountStatus: "deletion" };
    } else if (user.accountStatus === "deletion") {
      await User.updateUser({ _id: user._id }, { accountStatus: "active" });
      return { accountStatus: "active" };
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
