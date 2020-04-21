const CronJob = require("cron").CronJob;
const MovieRepository = require("../repositories/movie");
const InternalServerError = require("../errors/internal-server");

const Movie = new MovieRepository();

const removeOldMovies = async () => {
  try {
    const dateNow = new Date();

    const date = `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1 < 10 ? 0 : 1
    }${dateNow.getMonth() + 1}-${dateNow.getDate()}`;

    const movies = await Movie.removeMovie({
      endDate: { $lt: date },
    });

    console.log(
      `------------ DELETED MOVIES (${date}) ------------

${movies !== null ? movies : "No movies to delete"}

-----------------------------------------------------`
    );
  } catch (error) {
    throw new InternalServerError(`Something wrong: ${error}`);
  }
};

const schedule = new CronJob("0 0 */24 * * *", () => removeOldMovies);

module.exports = () => {
  removeOldMovies();
  schedule.start();
};
