const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("tag", TagSchema);