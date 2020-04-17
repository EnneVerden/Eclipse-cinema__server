const mongoose = require("mongoose");
const Role = require("./role");
const AuthenticationError = require("../errors/authentication");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: "https://image.flaticon.com/icons/svg/236/236831.svg",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 30,
  },
  balance: {
    type: Number,
    default: 0,
  },
  rolesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  ],
  moviesId: {
    type: Array,
    default: [],
  },
  accountStatus: {
    type: String,
    enum: ["active", "deletion", "deleted"],
    default: "active",
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const defaultRole = await Role.findOne({ name: "user" });

    return this.rolesId.push(defaultRole._id);
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", UserSchema);
