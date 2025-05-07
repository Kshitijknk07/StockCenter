const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(
    `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
