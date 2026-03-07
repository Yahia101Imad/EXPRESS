// IMPORT PACKAGE
const express = require("express");
const {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getHighestRated,
  getMovieStats,
  getMoviesByGenre,
  restrict
} = require("../controllers/moviesController");

const { protect } = require("../controllers/authController");

// ROUTING
const moviesRouter = express.Router();

// TODO: THIS ROUTE DOES NOT WORK !
moviesRouter.route("/highest-rated").get(getHighestRated, getAllMovies);

moviesRouter.route("/movie-stats").get(getMovieStats);

moviesRouter.route("/movies-by-genre/:genre").get(getMoviesByGenre);

moviesRouter.route("/").get(protect, getAllMovies).post(postMovie);
moviesRouter.route("/:id").get(protect, getMovie).patch(patchMovie).delete(protect, restrict('admin'), deleteMovie);

// EXPORTS
module.exports = moviesRouter;
