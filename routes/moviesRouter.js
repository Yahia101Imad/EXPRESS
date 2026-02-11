// IMPORT PACKAGE
const express = require("express");
const {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  validateBody
} = require("../controllers/moviesController");

// ROUTING
const moviesRouter = express.Router();

moviesRouter.route("/").get(getAllMovies).post(validateBody, postMovie);
moviesRouter.route("/:id").get(getMovie).patch(patchMovie).delete(deleteMovie);

// EXPORTS
module.exports = moviesRouter;
