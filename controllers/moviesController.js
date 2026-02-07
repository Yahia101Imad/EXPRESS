// IMPORT PACKAGES
const fs = require("fs");

// MOVIES API ARRAY
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

// PARAM MIDDLEWARE
const checkId = (req, res, next, value) => {
  const movie = movies.find((mov) => mov.id === Number(value));
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `movie not found (id = ${value} doesn't exist)`,
    });
  }
  next();
};

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
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requestedAT,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

const getMovie = (req, res) => {
  const id = Number(req.params.id);

  const movie = movies.find((mov) => mov.id === id);

  //   if (!movie) {
  //     return res.status(404).json({
  //       status: "fail",
  //       message: "movie not found (id doesn't exist)",
  //     });
  //   }
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

const postMovie = (req, res) => {
  const newId = movies.length + 1;
  const newMovie = Object.assign({ id: newId }, req.body);

  movies.push(newMovie);

  console.log(req.body);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};

const patchMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((mov) => mov.id === id);
  const index = movies.indexOf(movieToUpdate); // eg: movie with id = 4, index = 3

  //   if (!movieToUpdate) {
  //     return res.status(404).json({
  //       status: "fail",
  //       message: "movie not found",
  //     });
  //   }

  Object.assign(movieToUpdate, req.body);

  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    // if (!movieToUpdate) {
    //   res.status(404).json({
    //     status: "fail",
    //     message: "movie not found (id doesn't exist)",
    //   });
    // }
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

const deleteMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToDelete = movies.find((mov) => mov.id === id);
  const index = movies.indexOf(movieToDelete);

  //   if (!movieToDelete) {
  //     return res.status(404).json({
  //       status: "fail",
  //       message: "movie not found (id doesn't exist)",
  //     });
  //   }

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

module.exports = {
  getAllMovies,
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  checkId,
  validateBody,
};
