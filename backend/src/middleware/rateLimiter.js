const rateLimit = require("express-rate-limit");
const config = require("../config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: "Too many requests, please try again later.",
    },
  },
});

module.exports = limiter;
