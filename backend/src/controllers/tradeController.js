const stockService = require("../services/stockService");
const { logger } = require("../utils/logger");

exports.setupTradeSocket = (io) => {
  io.on("connection", (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on("subscribe", (symbol) => {
      logger.info(`Client ${socket.id} subscribing to ${symbol}`);

      const room = `trade:${symbol}`;
      socket.join(room);

      if (io.sockets.adapter.rooms.get(room).size === 1) {
        const callback = (trade) => {
          io.to(room).emit("trade", trade);
        };

        socket.tradeCallbacks = socket.tradeCallbacks || {};
        socket.tradeCallbacks[symbol] = callback;

        stockService.addTradeListener(symbol, callback);
      }
    });

    socket.on("unsubscribe", (symbol) => {
      logger.info(`Client ${socket.id} unsubscribing from ${symbol}`);

      const room = `trade:${symbol}`;
      socket.leave(room);

      if (
        !io.sockets.adapter.rooms.get(room) ||
        io.sockets.adapter.rooms.get(room).size === 0
      ) {
        if (socket.tradeCallbacks && socket.tradeCallbacks[symbol]) {
          stockService.removeTradeListener(
            symbol,
            socket.tradeCallbacks[symbol]
          );
          delete socket.tradeCallbacks[symbol];
        }
      }
    });

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);

      if (socket.tradeCallbacks) {
        Object.entries(socket.tradeCallbacks).forEach(([symbol, callback]) => {
          stockService.removeTradeListener(symbol, callback);
        });
      }
    });
  });
};
