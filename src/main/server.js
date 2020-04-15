const app = require("express")();
appInit = require("../loaders");
const { SERVER_PORT } = process.env;

exports.start = () => {
  appInit(app);

  app.listen(SERVER_PORT || 4000, () => {
    console.log(`Server started on port: ${SERVER_PORT || 4000}`);
  });
};
