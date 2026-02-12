// IMPORT PACKAGE
const mongoose = require("mongoose");

// SCHEMA
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    totalRating: {
      type: Number,
      default: 0,
      min: 0,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    directors: {
      type: [String],
      required: true,
    },
    coverImage: {
      type: String,
    },
    actors: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// MODEL
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
