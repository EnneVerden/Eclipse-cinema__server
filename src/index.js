const server = require("./main/server");

const start = async () => {
  try {
    server.start();
  } catch (error) {
    console.log(error);
  }
};

start();
