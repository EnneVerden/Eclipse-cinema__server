const MovieService = require("../services/movie");
const toJSON = require("../methods/toJSON");

const Movie = new MovieService();

class MovieController {
  async getMovies(req, res) {
    let movies = [];

    if (req.query.movieName) {
      const movie = await Movie.getMovieByName({
        movieName: req.query.movieName,
      });

      if (movie !== null) {
        movies = [...movies, movie];
      }
    } else {
      movies = await Movie.getMovies({
        page: req.query.page,
        tag: req.query.tag,
      });
    }

    const pagesCount = await Movie.getPagesCount({
      tag: req.query.tag,
    });

    res.status(201).send(
      toJSON({
        movies,
        pagesCount,
        currentPage: req.query.page,
        currentTag: req.query.tag,
      })
    );
  }

  async createMovie(req, res) {
    const movie = await Movie.createMovie(req.body, req.file.path);

    res.status(201).send(toJSON({ movie }));
  }

  async updateMovie(req, res) {
    let movieInfo = null;

    if (req.file) {
      movieInfo = await Movie.updateMovieById(
        req.params.id,
        false,
        req.file.path
      );
    } else {
      movieInfo = await Movie.updateMovieById(req.params.id, req.body);
    }

    res.status(201).send(toJSON({ movie: movieInfo }));
  }

  async removeMovie(req, res) {
    await Movie.removeMovieById(req.params.id);

    res.status(201).send(toJSON({ deletedMovieId: req.params.id }));
  }
}

module.exports = MovieController;
