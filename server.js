// IMPORT PACKAGE
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// ENVIRONMENT VARIABLES
// console.log(app.get('env'))
// console.log(process.env)
// const port = process.env.PORT || 3000;

// MONGOOSE
const DB = process.env.CONN_STR.replace(
  "<USERNAME>",
  process.env.DB_USERNAME,
).replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected succeed");

    // CREATE DOCUMENT FROM MODEL
    const movieTest = new Movie({
      name: "Shutter Island",
      description: "very good movie",
      duration: 120,
      rating: 8.4,
    });

    return movieTest.save();
  })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

// SERVER
// app.listen(port, () => {
//   console.log("The server is listening...");
// });
