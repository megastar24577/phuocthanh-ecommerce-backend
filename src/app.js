const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

//init middlewares

//for logging
app.use(morgan("dev"));
//for hiding header
app.use(helmet());
//for compress response data
app.use(compression());

//init db

//init routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello world",
  });
});

//handling error
module.exports = app;
