const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  async getMovies(data) {
    const { page, tag } = data;

    return await Movie.getMovies({ page, tag });
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
