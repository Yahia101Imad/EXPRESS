// IMPORT PACKAGE
const express = require("express");
const app = express();

// ROUTING (HTTP METHOD, URL)
// app.get('/', (req, res) => {
//     res.status(200).send('Hi this is the app')
// })

// GET: /api/v1/movies
const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
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

  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
});

// POST: /api/v1/movies
app.use(express.json());

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

// SERVER
app.listen(3000, () => {
  console.log("The server is listening...");
});
