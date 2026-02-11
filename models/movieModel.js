// IMPORT PACKAGE
const mongoose = require("mongoose");

// SCHEMA
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required field"],
    unique: true,
  },
  description: String,
  duration: {
    type: Number,
    require: [true, "duration is required field"],
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});

// MODEL
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie