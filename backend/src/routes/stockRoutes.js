const express = require("express");
const stockController = require("../controllers/stockController");
const { validateRequest } = require("../middleware/validator");
const {
  marketStatusSchema,
  marketHolidaySchema,
  insiderTransactionsSchema,
  insiderSentimentSchema,
  financialsReportedSchema,
} = require("../schemas/stockSchemas");

const router = express.Router();

// Market Status
router.get(
  "/market-status",
  validateRequest(marketStatusSchema),
  stockController.getMarketStatus
);

// Market Holiday
router.get(
  "/market-holiday",
  validateRequest(marketHolidaySchema),
  stockController.getMarketHoliday
);

// Insider Transactions
router.get(
  "/insider-transactions",
  validateRequest(insiderTransactionsSchema),
  stockController.getInsiderTransactions
);

// Insider Sentiment
router.get(
  "/insider-sentiment",
  validateRequest(insiderSentimentSchema),
  stockController.getInsiderSentiment
);

// Financials Reported
router.get(
  "/financials-reported",
  validateRequest(financialsReportedSchema),
  stockController.getFinancialsReported
);

module.exports = router;
