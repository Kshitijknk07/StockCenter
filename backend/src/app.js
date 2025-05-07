const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const { logger } = require("./utils/logger");
const tradeController = require("./controllers/tradeController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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

// Set up WebSocket for trade updates
tradeController.setupTradeSocket(io);

// Attach server to app for use in server.js
app.server = server;

module.exports = app;
