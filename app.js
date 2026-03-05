const express = require("express");
const dotenv = require("dotenv");
const commandsRoutes = require("./routes/commands");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/commands", commandsRoutes);

app.use(errorHandler);

module.exports = app;