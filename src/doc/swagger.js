// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("../config/logger");
const { port } = require("../config/config");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API documentation for the Notes service",
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  logger.info(`Swagger doc: http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
