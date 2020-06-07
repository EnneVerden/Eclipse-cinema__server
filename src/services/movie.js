const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  moviesPerPage = 12;

  async getMovies(data) {
    const { page } = data;
    let { tag } = data;

    if (tag) {
      return await Movie.getMovies({ page, tag });
    } else if (page) {
      return await Movie.getMovies({ page });
    } else {
      return await Movie.getMovies();
    }
  }

  async getPagesCount(searchData) {
    const movies = await Movie.getAllMoviesByTag(searchData);
    const pagesCount = Math.ceil(movies.length / this.moviesPerPage);

    return pagesCount !== 0 ? pagesCount : 1;
  }

  async createMovie(data, imagePath) {
    return await Movie.createMovie({
      ...data,
      tags: JSON.parse(data.tags),
      poster: imagePath,
    });
  }

  async updateMovieById(id, data) {
    return await Movie.updateMovie({ _id: id }, data);
  }

  async removeMovieById(id) {
    return await Movie.removeMovie({ _id: id });
  }
}

module.exports = MovieService;
