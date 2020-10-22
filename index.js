const server = require("./server.js");
const colors = require("colors");
require("dotenv").config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

server.listen(8000, () => {
  console.log(`\n === SERVER RUNNING ON ${PORT} === `.magenta.bold.underline);
});
