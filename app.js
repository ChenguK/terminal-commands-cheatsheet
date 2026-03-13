const express = require("express");
const dotenv = require("dotenv");
const commandsRoutes = require("./routes/commandRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, 
    message: {
        status: 429,
        error: "Too many requests",
        message: "Too many requests from this IP, please try again later."
    }
});


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/commands", commandsRoutes);

app.use(errorHandler);

module.exports = app;