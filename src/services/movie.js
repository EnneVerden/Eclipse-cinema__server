const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  async getMovies() {
    return await Movie.getMovies();
  }

  async createMovie(data) {
    return await Movie.createMovie(data);
  }
}

module.exports = MovieService;
