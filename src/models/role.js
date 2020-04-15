const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("role", RoleSchema);
