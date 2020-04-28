const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const { ORIGIN_URL } = process.env;

module.exports = (expressApp) => {
  expressApp
    .use(
      cors({
        origin: ORIGIN_URL,
        credentials: true,
      })
    )
    .use(cookieParser())
    .use(express.urlencoded({ extended: false }))
    .use(express.json());
};
