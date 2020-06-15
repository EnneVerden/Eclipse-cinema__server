const Movie = require("../models/movie");

class MovieRepository {
  moviesPerPage = 12;

  getMovies(searchData) {
    if (!searchData) {
      return Movie.find().populate("tags", { __v: 0 });
    }

    const { page, tag, movieName } = searchData;

    let tagsExp;

    if (tag && movieName) {
      tagsExp = {
        tags: { $in: tag },
        $or: [{ movieName: { $regex: searchData.movieName, $options: "i" } }],
      };
    }
    if (movieName && !tag) {
      tagsExp = {
        $or: [{ movieName: { $regex: searchData.movieName, $options: "i" } }],
      };
    }
    if (tag && !movieName) tagsExp = { tags: { $in: tag } };

    return Movie.find(tagsExp, { __v: 0 })
      .populate("tags", { __v: 0 })
      .limit(this.moviesPerPage)
      .skip((page - 1) * this.moviesPerPage);
  }

  getAllMoviesByTag(searchData) {
    const { tag } = searchData;
    let tagsExp;

    if (tag) tagsExp = { tags: { $in: tag } };

    return Movie.find(tagsExp);
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
