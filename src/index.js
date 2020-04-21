const server = require("./main/server");
const database = require("./main/database");
const autoMoviesRemover = require("./classes/remover");

const start = async () => {
  try {
    await database.connect();
    server.start();
    autoMoviesRemover();
  } catch (error) {
    console.log(error);
  }
};

start();
