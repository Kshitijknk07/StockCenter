const httpClient = require("../utils/httpClient");
const config = require("../config");
const { logger } = require("../utils/logger");
const WebSocket = require("ws");

class StockService {
  constructor() {
    this.socket = null;
    this.subscribers = new Map();
  }

  async getCandles(symbol, resolution, from, to) {
    try {
      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/candle`,
        {
          params: {
            symbol,
            resolution,
            from,
            to,
            token: config.finnhub.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching candle data:", error);
      throw error;
    }
  }

  async getQuote(symbol) {
    try {
      const response = await httpClient.get(`${config.finnhub.baseUrl}/quote`, {
        params: {
          symbol,
          token: config.finnhub.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      logger.error("Error fetching quote data:", error);
      throw error;
    }
  }

  async getCompanyProfile(symbol) {
    try {
      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/profile2`,
        {
          params: {
            symbol,
            token: config.finnhub.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching company profile:", error);
      throw error;
    }
  }

  connectWebSocket() {
    if (this.socket) {
      return;
    }

    this.socket = new WebSocket(
      `wss://ws.finnhub.io?token=${config.finnhub.apiKey}`
    );

    this.socket.on("open", () => {
      logger.info("WebSocket connection established");

      // Subscribe to symbols that were requested before connection was established
      this.subscribers.forEach((callbacks, symbol) => {
        this.subscribeToSymbol(symbol);
      });
    });

    this.socket.on("message", (data) => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "trade") {
          parsedData.data.forEach((trade) => {
            const symbol = trade.s;
            const callbacks = this.subscribers.get(symbol) || [];
            callbacks.forEach((callback) => {
              callback(trade);
            });
          });
        }
      } catch (error) {
        logger.error("Error processing WebSocket message:", error);
      }
    });

    this.socket.on("error", (error) => {
      logger.error("WebSocket error:", error);
    });

    this.socket.on("close", () => {
      logger.info("WebSocket connection closed");
      this.socket = null;

      // Attempt to reconnect after a delay
      setTimeout(() => {
        this.connectWebSocket();
      }, 5000);
    });
  }

  subscribeToSymbol(symbol) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connectWebSocket();
      return;
    }

    this.socket.send(JSON.stringify({ type: "subscribe", symbol }));
    logger.info(`Subscribed to symbol: ${symbol}`);
  }

  unsubscribeFromSymbol(symbol) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    logger.info(`Unsubscribed from symbol: ${symbol}`);
  }

  addTradeListener(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, []);
      this.subscribeToSymbol(symbol);
    }

    this.subscribers.get(symbol).push(callback);
    return () => this.removeTradeListener(symbol, callback);
  }

  removeTradeListener(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      return;
    }

    const callbacks = this.subscribers.get(symbol);
    const index = callbacks.indexOf(callback);

    if (index !== -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.subscribers.delete(symbol);
      this.unsubscribeFromSymbol(symbol);
    }
  }
}

module.exports = new StockService();
