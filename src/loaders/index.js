const expressInit = require("./express");
const routesInit = require("./routes");
const errorHandlerInit = require("./errorHandler");

module.exports = (expressApp) => {
  expressInit(expressApp);
  routesInit(expressApp);
  errorHandlerInit(expressApp);
};
