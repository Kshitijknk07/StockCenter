const axios = require("axios");
const { logger } = require("./logger");
const config = require("../config");

const httpClient = axios.create({
  headers: {
    "X-Finnhub-Token": config.finnhub.apiKey,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    logger.info(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logger.error("Request error:", error);
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    logger.info(`Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      logger.error(
        `Response error: ${error.response.status} from ${error.config.url}`
      );
    } else {
      logger.error("Response error:", error.message);
    }
    return Promise.reject(error);
  }
);

module.exports = httpClient;
