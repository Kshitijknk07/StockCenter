const app = require("./src/app");
const { logger } = require("./src/utils/logger");
const config = require("./src/config");

const PORT = config.port;

const server = app.server.listen(PORT, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
