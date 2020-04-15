const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  description: {
    type: String,
  },
  tagsId: {
    type: Array,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  ticketPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("movie", MovieSchema);
