// IMPORT PACKAGE
const express = require("express");
const {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getHighestRated
} = require("../controllers/moviesController");

// ROUTING
const moviesRouter = express.Router();

moviesRouter.route("/highest-rated").get(getHighestRated, getAllMovies);
moviesRouter.route("/").get(getAllMovies).post(postMovie);
moviesRouter.route("/:id").get(getMovie).patch(patchMovie).delete(deleteMovie);

// EXPORTS
module.exports = moviesRouter;
