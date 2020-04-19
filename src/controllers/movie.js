const MovieService = require("../services/movie");
const toJSON = require("../methods/toJSON");

const Movie = new MovieService();

class MovieController {
  async getMovies(req, res) {
    const movies = await Movie.getMovies();

    res.status(201).send(toJSON(movies));
  }

  async createMovie(req, res) {
    const movie = await Movie.createMovie(req.body);

    res.status(201).send(toJSON(movie));
  }

  async removeMovie(req, res) {
    await Movie.removeMovieById(req.params.id);

    res.status(201).send(toJSON({ deletedMovieID: req.params.id }));
  }
}

module.exports = MovieController;
