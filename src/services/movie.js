const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  async getMovies() {
    return await Movie.getMovies();
  }

  async createMovie(data) {
    return await Movie.createMovie(data);
  }

  async removeMovieById(id) {
    return await Movie.removeMovie({ _id: id });
  }
}

module.exports = MovieService;
