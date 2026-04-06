const express = require("express");
const dotenv = require("dotenv");
const commandsRoutes = require("./routes/commandRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to DevCommands API",
    description: "A beginner-friendly API for learning CLI commands",
    docs: "http://localhost:3000/api-docs"
  });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/commands", commandsRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
