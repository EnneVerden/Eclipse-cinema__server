const Movie = require("../models/movie");
const NotFoundError = require("../errors/not-found");

class MovieRepository {
  getMovies(searchData) {
    return Movie.find(searchData).populate("tagsId", { _id: 0 });
  }

  getMovie(searchData) {
    return Movie.findOne(searchData).populate("tagsId", { _id: 0 });
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
