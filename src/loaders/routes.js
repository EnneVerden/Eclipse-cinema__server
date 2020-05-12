const authRoute = require("../routes/auth");
const usersRoute = require("../routes/users");
const moviesRoute = require("../routes/movies");
const tagsRoute = require("../routes/tags");

module.exports = (expressApp) => {
  expressApp.use("/", authRoute);
  expressApp.use("/users", usersRoute);
  expressApp.use("/movies", moviesRoute);
  expressApp.use("/tags", tagsRoute);
};
