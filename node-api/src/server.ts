import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => {
  logger.info(`Enterprise Node.js REST API listening at http://localhost:${PORT}/api/v1`);
});