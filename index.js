const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const server = express();

server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});
