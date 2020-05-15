const Movie = require("../models/movie");

class MovieRepository {
  moviesPerPage = 12;

  getMovies(searchData) {
    const { page = 1, tag } = searchData;
    let tagsExp;

    if (tag) tagsExp = { tags: { $in: tag } };

    return Movie.find(tagsExp, { __v: 0 })
      .populate("tags", { __v: 0 })
      .limit(this.moviesPerPage)
      .skip((page - 1) * this.moviesPerPage);
  }

  getPagesCount() {
    const moviesCount = Movie.countDocuments();

    return moviesCount;
  }

  getMovie(searchData) {
    return Movie.findOne(searchData, { __v: 0 }).populate("tags", { __v: 0 });
  }

  getMoviesForDeletion(searchData) {
    return Movie.find(searchData);
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
