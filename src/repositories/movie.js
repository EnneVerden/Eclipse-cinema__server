const Movie = require("../models/movie");

class MovieRepository {
  getMovies(searchData) {
    const moviesPerPage = 12;
    const { page = 1, tag } = searchData;
    let tagsExp;

    if (tag) tagsExp = { tagsId: { $in: tag } };

    return Movie.find(tagsExp, { __v: 0 })
      .populate("tagsId", { __v: 0 })
      .limit(moviesPerPage)
      .skip((page - 1) * moviesPerPage);
  }

  getMovie(searchData) {
    return Movie.findOne(searchData, { __v: 0 }).populate("tagsId", { __v: 0 });
  }

  createMovie(movie) {
    return Movie.create(movie);
  }

  updateMovie(searchData, dataForUpdating) {
    return Movie.findOneAndUpdate(searchData, dataForUpdating, {
      new: true,
      fields: Object.keys(dataForUpdating),
    }).exec();
  }

  removeMovie(searchData) {
    return Movie.findOneAndRemove(searchData);
  }
}

module.exports = MovieRepository;
