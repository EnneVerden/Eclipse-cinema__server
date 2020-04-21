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
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
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

MovieSchema.post("findOneAndUpdate", (error, res, next) => {
  if (error.name === "CastError" && error.code === undefined) {
    next(new NotFoundError("Movie not found!"));
  } else {
    next();
  }
});

MovieSchema.post("findOneAndRemove", (error, res, next) => {
  if (error.name === "CastError" && error.code === undefined) {
    next(new NotFoundError("Movie not found!"));
  } else {
    next();
  }
});

module.exports = mongoose.model("movie", MovieSchema);
