const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dungeonRoutes = require("./routes/dungeonRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", dungeonRoutes);

module.exports = app;
