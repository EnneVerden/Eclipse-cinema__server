const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  async getMovies(searchData) {
    return await Movie.getMovies(searchData);
  }

  async createMovie(data) {
    return await Movie.createMovie(data);
  }

  async updateMovieById(id, data) {
    return await Movie.updateMovie({ _id: id }, data);
  }

  async removeMovieById(id) {
    return await Movie.removeMovie({ _id: id });
  }
}

module.exports = MovieService;
