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
  tagsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  ticketPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("movie", MovieSchema);
