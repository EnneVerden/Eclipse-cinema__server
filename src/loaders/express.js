const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");

module.exports = (expressApp) => {
  expressApp
    .use(cors())
    .use(cookieParser())
    .use(express.urlencoded({ extended: false }))
    .use(express.json());
};
