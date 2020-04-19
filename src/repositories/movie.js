const Movie = require("../models/movie");

class MovieRepository {
  getMovies(searchData) {
    return Movie.find(searchData, { __v: 0 }).populate("tagsId");
  }

  getMovie(searchData) {
    return Movie.findOne(searchData, { __v: 0 }).populate("tagsId");
  }

  createMovie(movie) {
    return Movie.create(movie);
  }

  updateMovie(searchData, dataForUpdating) {
    return Movie.updateOne(searchData, dataForUpdating);
  }

  removeMovie(searchData) {
    return Movie.remove(searchData);
  }
}

module.exports = MovieRepository;
