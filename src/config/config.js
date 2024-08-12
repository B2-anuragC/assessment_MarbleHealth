require("dotenv").config();

const requiredEnvVars = ["MONGO_URI"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(
      `Environment variable ${envVar} is required but not defined.`
    );
  }
});

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
};
