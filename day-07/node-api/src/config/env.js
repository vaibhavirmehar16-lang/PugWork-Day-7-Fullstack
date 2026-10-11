const path = require("node:path");
require("dotenv").config();

const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "local-only-change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  adminEmail: process.env.ADMIN_EMAIL || "admin@pugwork.local",
  adminPassword: process.env.ADMIN_PASSWORD || "PugWork@123",
  dataFile: path.resolve(process.cwd(), process.env.DATA_FILE || "./data/employees.json"),
};

if (config.nodeEnv === "production" && config.jwtSecret === "local-only-change-this-secret") {
  throw new Error("JWT_SECRET must be configured with a strong secret in production.");
}

module.exports = config;
