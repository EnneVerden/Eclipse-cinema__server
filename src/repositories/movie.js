const Movie = require("../models/movie");

class MovieRepository {
  createMovie(movie) {
    return Movie.create(movie);
  }
}

module.exports = MovieRepository;
