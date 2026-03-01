// IMPORT PACKAGE
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// HANDLING UNCAUGHT EXCEPTION GLOBALLY
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaught exception occurred! Shutting down...");
  process.exit(1);
});

// APP PACKAGE
const app = require("./app");

const port = process.env.PORT || 3000;

// MONGOOSE
const DB = process.env.CONN_STR.replace(
  "<USERNAME>",
  process.env.DB_USERNAME,
).replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then((doc) => {
  console.log("DB Connected successfully!");
});
// .catch((err) => {
//   console.log(err);
// });

// SERVER
const server = app.listen(port, () => {
  console.log("The server is listening...");
});

// HANDLING REJECTED PROMISES GLOBALLY
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occurred! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
