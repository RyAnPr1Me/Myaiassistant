// lib/logger.js
const logger = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()} ${message}`),
  error: (message) => console.error(`[ERROR] ${new Date().toISOString()} ${message}`)
};

export default logger;
