const DeletedUser = require("../models/deletedUser");

class DeletedUserRepository {
  saveDeletedUsers(users) {
    return DeletedUser.insertMany(users);
  }

  getDeletedUser(searchData) {
    return DeletedUser.findOne(searchData);
  }
}

module.exports = DeletedUserRepository;
