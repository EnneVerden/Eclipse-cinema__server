const errorHandler = require("../middleware/error-handler");

module.exports = (expressApp) => {
  expressApp.use(errorHandler);
};
