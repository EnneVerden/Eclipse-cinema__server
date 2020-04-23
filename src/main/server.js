const app = require("express")();
appInit = require("../loaders");
const { PORT } = process.env;

exports.start = () => {
  appInit(app);

  app.listen(PORT || 4000, () => {
    console.log(`Server started on port: ${PORT || 4000}`);
  });
};
