// IMPORT PACKAGE
const express = require("express");
const app = express();
const morgan = require("morgan");
const moviesRouter = require("./routes/moviesRouter");

// SETTING THE QUERY PARSER
app.set('query parser', 'extended');

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use((req, res, next) => {
  req.requestedAT = new Date().toISOString();
  next();
});
app.use(express.static("./public"));
// Router
app.use("/api/v1/movies", moviesRouter);

module.exports = app;
