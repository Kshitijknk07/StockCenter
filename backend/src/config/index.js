require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  finnhub: {
    apiKey: process.env.FINNHUB_API_KEY,
    baseUrl: process.env.FINNHUB_BASE_URL || 'https://finnhub.io/api/v1'
  },
  rateLimiter: {
    windowMs: 15 * 60 * 1000,
    max: 100
  }
};