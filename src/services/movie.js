const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  moviesPerPage = 12;

  async getMovies(data) {
    const { page } = data;
    let { tag } = data;

    if (tag) {
      return await Movie.getMovies({ page, tag });
    } else {
      return await Movie.getMovies({ page });
    }
  }

  async getPagesCount(searchData) {
    const movies = await Movie.getAllMoviesByTag(searchData);
    const pagesCount = Math.ceil(movies.length / this.moviesPerPage);

    return pagesCount !== 0 ? pagesCount : 1;
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
