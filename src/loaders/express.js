const cookieParser = require("cookie-parser");
const express = require("express");

module.exports = (expressApp) => {
  expressApp
    .use(cookieParser())
    .use(express.urlencoded({ extended: false }))
    .use(express.json());
};
