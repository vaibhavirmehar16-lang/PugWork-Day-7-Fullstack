const app = require("./app");
const config = require("./config/env");
const { ensureFile } = require("./models/employeeModel");

async function start() {
  await ensureFile();
  app.listen(config.port, () => {
    console.log(`PugWork API listening at http://localhost:${config.port}`);
    console.log(`Health check: http://localhost:${config.port}/api/v1/health`);
  });
}
start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
