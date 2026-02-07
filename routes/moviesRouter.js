// IMPORT PACKAGE
const express = require("express");
const {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  checkId,
  validateBody
} = require("../controllers/moviesController");

// ROUTING
const moviesRouter = express.Router();

moviesRouter.route("/").get(getAllMovies).post(validateBody, postMovie);
moviesRouter.route("/:id").get(getMovie).patch(patchMovie).delete(deleteMovie);

// USING PARAM MIDDLEWARE
moviesRouter.param('id', checkId)

// EXPORTS
module.exports = moviesRouter;
