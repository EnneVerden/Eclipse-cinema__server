const MovieRepository = require("../repositories/movie");
const TagRepository = require("../repositories/tag");

const Movie = new MovieRepository();
const Tag = new TagRepository();

class MovieService {
  moviesPerPage = 12;

  async getMovies(data) {
    const { page } = data;
    let { tag } = data;

    if (tag) {
      tag = await Tag.getTag({ name: tag });

      return await Movie.getMovies({ page, tag: tag._id });
    } else {
      return await Movie.getMovies({ page });
    }
  }

  async getPagesCount() {
    const pagesCount = await Movie.getPagesCount();

    return Math.ceil(pagesCount / this.moviesPerPage);
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
