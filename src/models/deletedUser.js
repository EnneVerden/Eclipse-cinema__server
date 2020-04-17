const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeletedUserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  avatar: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  balance: {
    type: Number,
  },
  rolesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  ],
  moviesId: {
    type: Array,
  },
  accountStatus: {
    type: String,
    default: "deleted",
  },
});

module.exports = mongoose.model("deleted_user", DeletedUserSchema);
