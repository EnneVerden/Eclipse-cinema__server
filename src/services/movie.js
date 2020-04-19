const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  async createMovie(data) {
    return await Movie.createMovie(data);
  }
}

module.exports = MovieRepository;
