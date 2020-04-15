const mongoose = require("mongoose");
const { DB_LOGIN, DB_PASSWORD, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@cluster0-iujif.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

exports.connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Successful connecting to database!");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};
