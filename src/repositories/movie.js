const Movie = require("../models/movie");

class MovieRepository {
  getMovies(searchData) {
    return Movie.find(searchData, { __v: 0 }).populate("tagsId", { __v: 0 });
  }

  getMovie(searchData) {
    return Movie.findOne(searchData, { __v: 0 }).populate("tagsId", { __v: 0 });
  }

  createMovie(movie) {
    return Movie.create(movie);
  }

  updateMovie(searchData, dataForUpdating) {
    return Movie.findOneAndUpdate(searchData, dataForUpdating, {
      new: true,
      fields: Object.keys(dataForUpdating),
    }).exec();
  }

  removeMovie(searchData) {
    return Movie.findOneAndRemove(searchData);
  }
}

module.exports = MovieRepository;
