const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevCommands API",
      version: "1.0.0",
      description: "API for storing and searching developer CLI commands",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],


    components: {
      schemas: {
        Command: {
          type: "object",
          required: ["name", "description", "category"],
          properties: {
            _id: {
              type: "string",
              example: "69b43c92981fa6484ab27951",
            },
            name: {
              type: "string",
              example: "ls",
            },
            description: {
              type: "string",
              example: "List directory contents",
            },
            category: {
              type: "string",
              example: "linux",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["filesystem", "navigation"],
            },
            example: {
              type: "string",
              example: "ls -la",
            },
            difficulty: {
              type: "string",
              enum: ["beginner", "intermediate", "advanced"],
              example: "beginner",
            },
            favorite: {
              type: "boolean",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CommandResponse: {
          type: "object",
          properties: {
            total: { type: "integer", example: 6 },
            page: { type: "integer", example: 1 },
            pages: { type: "integer", example: 2 },
            limit: { type: "integer", example: 5 },
            hasNextPage: { type: "boolean", example: true },
            hasPrevPage: { type: "boolean", example: false },
            nextPage: { type: "integer", nullable: true },
            prevPage: { type: "integer", nullable: true },
            results: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Command",
              },
            },
          },
        },
      },
    },
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
