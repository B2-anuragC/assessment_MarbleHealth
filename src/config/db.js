const mongoose = require("mongoose");
const logger = require("./logger");
const { mongoUri } = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("Could not connect to MongoDB...", err);
    process.exit(1);
  }
};

module.exports = connectDB;
