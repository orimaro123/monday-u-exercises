require('dotenv').config()
const cors = require("cors");
const express = require("express");
const { Sequelize } = require("sequelize");

const {DB_USERNAME, DB_NAME, DB_PASSWORD} = process.env;
const sequelize = new Sequelize(DB_USERNAME, DB_NAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
test();

const path = require("path");

const bodyParser = require("body-parser");

require("express-async-errors");

const logger = require("./server/middleware/logger");

const errorHandler = require("./server/middleware/error_handler");
const itemRouter = require("./server/routes/itemRouter");
const { env } = require('process');

const server = express();
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(logger);
// server.use([express.json(), express.static("dist")]);
server.use("/item", itemRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    health: `ok`,
  });
});

server.use(errorHandler);

const port = process.env.PORT || "8080";

server.listen(port, function () {
  console.log("Running on " + port);
});

module.exports = server;
