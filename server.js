// IMPORT PACKAGE
const app = require("./app");

// ENVIRONMENT VARIABLES
// console.log(app.get('env'))
// console.log(process.env)
const port = process.env.PORT || 3000;

// SERVER
app.listen(port, () => {
  console.log("The server is listening...");
});
