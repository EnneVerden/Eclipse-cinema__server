const server = require("./main/server");
const database = require("./main/database");

const start = async () => {
  try {
    await database.connect();
    server.start();
  } catch (error) {
    console.log(error);
  }
};

start();
