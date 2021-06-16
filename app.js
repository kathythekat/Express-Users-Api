const express = require("express");
const { NotFoundError } = require("./errorHandling");
const app = express();

const routes = require("./routes");

app.use(express.json());

app.use("/users", routes);

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({ error: message, status });
});

app.listen(3001, console.log("Started on localhost:3001"));

module.exports = app;
