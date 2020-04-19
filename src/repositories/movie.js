const Movie = require("../models/movie");

class MovieRepository {
  getMovies() {
    return Movie.find().populate("tagsId", { _id: 0 });
  }

  createMovie(movie) {
    return Movie.create(movie);
  }

  removeMovie(searchData) {
    return Movie.remove(searchData);
  }
}

module.exports = MovieRepository;
