const mongoose = require("mongoose");
const Role = require("./role");
const Hash = require("../classes/hash");
const InternalServerError = require("../errors/internal-server");

const Schema = mongoose.Schema;
const hash = new Hash().hash;
const compare = new Hash().compare;

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: "https://image.flaticon.com/icons/svg/236/236831.svg",
  },
  fullName: {
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
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "movie",
    },
  ],
  accountStatus: {
    type: String,
    enum: ["active", "deletion"],
    default: "active",
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const defaultRole = await Role.findOne({ name: "user" });

    this.rolesId.push(defaultRole._id);
    this.password = await hash(this.password);
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.checkPassword = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw new InternalServerError("Internal server error!");
  }
};

module.exports = mongoose.model("user", UserSchema);
