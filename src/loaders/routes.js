const authRoute = require("../routes/auth");
const usersRoute = require("../routes/users");

module.exports = (expressApp) => {
  expressApp.use("/", authRoute);
  expressApp.use("/users", usersRoute);
};
