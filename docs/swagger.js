const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DevCommands API",
            version: "1.0.0",
            description: "API for storing and searching developer CLI commands"
        },
        servers: [ 
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;