const authRoute = require("../routes/auth");

module.exports = (expressApp) => {
  expressApp.use("/", authRoute);
};
