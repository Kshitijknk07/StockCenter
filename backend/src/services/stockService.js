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

  async getMarketStatus(exchange) {
    try {
      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/market-status`,
        {
          params: {
            exchange,
            token: config.finnhub.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching market status:", error);
      throw error;
    }
  }

  async getMarketHoliday(exchange) {
    try {
      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/market-holiday`,
        {
          params: {
            exchange,
            token: config.finnhub.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching market holiday data:", error);
      throw error;
    }
  }

  async getInsiderTransactions(symbol, from, to) {
    try {
      const params = {
        symbol,
        token: config.finnhub.apiKey,
      };

      if (from) params.from = from;
      if (to) params.to = to;

      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/insider-transactions`,
        { params }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching insider transactions:", error);
      throw error;
    }
  }

  async getInsiderSentiment(symbol, from, to) {
    try {
      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/insider-sentiment`,
        {
          params: {
            symbol,
            from,
            to,
            token: config.finnhub.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching insider sentiment:", error);
      throw error;
    }
  }

  async getFinancialsReported(params = {}) {
    try {
      const requestParams = {
        ...params,
        token: config.finnhub.apiKey,
      };

      const response = await httpClient.get(
        `${config.finnhub.baseUrl}/stock/financials-reported`,
        { params: requestParams }
      );

      return response.data;
    } catch (error) {
      logger.error("Error fetching financials reported:", error);
      throw error;
    }
  }
}

module.exports = new StockService();
