const express = require("express");
const dotenv = require("dotenv");
const commandsRoutes = require("./routes/commandRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");


dotenv.config();

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/commands", commandsRoutes);

app.use(errorHandler);

module.exports = app;