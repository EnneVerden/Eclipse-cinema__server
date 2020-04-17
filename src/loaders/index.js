const expressInit = require("./express");
const routesInit = require("./routes");
const sessionInit = require("./session");
const errorHandlerInit = require("./errorHandler");

module.exports = (expressApp) => {
  expressInit(expressApp);
  sessionInit(expressApp);
  routesInit(expressApp);
  errorHandlerInit(expressApp);
};
