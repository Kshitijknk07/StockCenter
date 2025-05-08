const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const { logger } = require("./utils/logger");

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(rateLimiter);
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found",
    },
  });
});

app.use(errorHandler);

// Attach server to app for use in server.js
app.server = server;

module.exports = app;
