const MovieService = require("../services/movie");
const toJSON = require("../methods/toJSON");

const Movie = new MovieService();

class MovieController {
  async getMovies(req, res) {
    const movies = await Movie.getMovies({
      page: req.query.page,
      tag: req.query.tag,
    });
    const pagesCount = await Movie.getPagesCount();

    res
      .status(201)
      .send(toJSON({ movies, pagesCount, currentPage: page, currentTag: tag }));
  }

  async createMovie(req, res) {
    const movie = await Movie.createMovie(req.body);

    res.status(201).send(toJSON({ movie }));
  }

  async updateMovie(req, res) {
    const movieInfo = await Movie.updateMovieById(req.params.id, req.body);

    res.status(201).send(toJSON({ movie: movieInfo }));
  }

  async removeMovie(req, res) {
    await Movie.removeMovieById(req.params.id);

    res.status(201).send(toJSON({ deletedMovieID: req.params.id }));
  }
}

module.exports = MovieController;
