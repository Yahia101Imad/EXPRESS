// IMPORT PACKAGE
const express = require("express");
const app = express();
const morgan = require("morgan");

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
  req.requestedAT = new Date().toISOString();
  next();
});
app.use(morgan('dev'))

// GET: /api/v1/movies
const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requestedAT,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

//GET: /api/v1/movies/:id
app.get("/api/v1/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  const movie = movies.find((mov) => mov.id === id);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "movie not found (id doesn't exist)",
    });
  }

  fs.readFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movie,
      },
    });
  });
});

// POST: /api/v1/movies
app.post("/api/v1/movies", (req, res) => {
  const newId = movies.length + 1;
  const newMovie = Object.assign({ id: newId }, req.body);

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
});

// PATCH: /api/v1/movies/:id
app.patch("/api/v1/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((mov) => mov.id === id);
  const index = movies.indexOf(movieToUpdate); // eg: movie with id = 4, index = 3

  Object.assign(movieToUpdate, req.body);

  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (!movieToUpdate) {
      res.status(404).json({
        status: "fail",
        message: "movie not found (id doesn't exist)",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
});

// DELETE: /api/v1/movies/:id
app.delete("/api/v1/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieToDelete = movies.find((mov) => mov.id === id);
  const index = movies.indexOf(movieToDelete);

  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: "movie not found (id doesn't exist)",
    });
  }

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
});

// SERVER
app.listen(3000, () => {
  console.log("The server is listening...");
});
