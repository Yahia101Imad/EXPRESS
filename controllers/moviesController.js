// IMPORT PACKAGES
const Movie = require("../models/movieModel");

// ROUTE HANDLER FUNCTIONS

const getHighestRated = (req, res, next) => {
  req.query.limit = "3";
  req.query.sort = "-rating";
  next();
};

const getAllMovies = async (req, res) => {
  console.log("REQ QUERY:", req.query, "REQ PARAMS:", req.params);
  try {
    // EXCLUDED FIELDS
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // QUERY
    let query = Movie.find(JSON.parse(queryStr));

    // SORTING LOGIC
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    // SELECTING FIELDS
    if (req.query.fields) {
      const selectBy = req.query.fields.split(",").join(" ");
      query = query.select(selectBy);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const moviesCount = await Movie.countDocuments(JSON.parse(queryStr));

    if (skip >= moviesCount && moviesCount > 0) {
      return res.status(404).json({
        status: "fail",
        message: "This page does not exist",
      });
    }

    query = query.skip(skip).limit(limit);

    // MOVIES AWAIT
    const movies = await query;

    res.status(200).json({
      status: "succeed",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getMovie = async (req, res) => {
  try {
    // const movie = await Movie.find({_id: req.params.id});
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "succeed",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const postMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "succeed",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const patchMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({
      status: "succeed",
      data: {
        movie: updatedMovie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "succeed",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getHighestRated,
};
