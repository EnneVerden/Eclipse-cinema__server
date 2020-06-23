const MovieRepository = require("../repositories/movie");

const Movie = new MovieRepository();

class MovieService {
  moviesPerPage = 12;

  async getMovies(data) {
    const { page } = data;
    let { tag } = data;

    if (tag) return await Movie.getMovies({ page, tag });
    if (page) return await Movie.getMovies({ page });

    return await Movie.getMovies();
  }

  async getMovieByName(data) {
    const { movieName } = data;

    if (movieName.length) {
      return await Movie.getMovie({ movieName });
    }
  }

  async getPagesCount(searchData) {
    const movies = await Movie.getAllMoviesByTag(searchData);
    const pagesCount = Math.ceil(movies.length / this.moviesPerPage);

    return pagesCount !== 0 ? pagesCount : 1;
  }

  async createMovie(data, imagePath) {
    const movie = await Movie.createMovie({
      ...data,
      tags: JSON.parse(data.tags),
      poster: imagePath,
    });

    return Movie.getMovie({ _id: movie._id });
  }

  async updateMovieById(id, data, imagePath) {
    if (!data) {
      return await Movie.updateMovie({ _id: id }, { poster: imagePath });
    }

    return await Movie.updateMovie({ _id: id }, data);
  }

  async removeMovieById(id) {
    return await Movie.removeMovie({ _id: id });
  }
}

module.exports = MovieService;
