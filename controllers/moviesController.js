// IMPORT PACKAGES
const Movie = require("../models/movieModel");

// MIDDLEWARE
const validateBody = (req, res, next) => {
  if (!req.body.title || !req.body.year) {
    return res.status(400).json({
      status: "fail",
      message: "not a valid data movie",
    });
  }
  next();
};

// ROUTE HANDLER FUNCTIONS
const getAllMovies = (req, res) => {};

const getMovie = (req, res) => {};

const postMovie = (req, res) => {};

const patchMovie = (req, res) => {};

const deleteMovie = (req, res) => {};

module.exports = {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  validateBody,
};
