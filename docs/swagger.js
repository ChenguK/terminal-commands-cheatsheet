const swaggerJsdoc = require("swagger-jsdoc");


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
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;