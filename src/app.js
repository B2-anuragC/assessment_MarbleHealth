const express = require("express");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/note.route");
const logger = require("./config/logger");
const swaggerDocs = require("./doc/swagger");

const { port, mongoUri, nodeEnv } = require("./config/config");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

swaggerDocs(app);

// Routes
app.use("/api", noteRoutes);

// Start the server
app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = app;
