const mongoose = require("mongoose");
const Tag = require("../models/tag");
const NotFoundError = require("../errors/not-found");

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

MovieSchema.post("findOne", (error, doc, next) => {
  if (error.name === "CastError") {
    next(new NotFoundError("Movie not found!"));
  } else {
    next();
  }
});

module.exports = mongoose.model("movie", MovieSchema);
