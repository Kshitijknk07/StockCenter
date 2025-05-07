const express = require("express");
const stockController = require("../controllers/stockController");

const router = express.Router();

router.get("/intraday", stockController.getIntradayData);
router.get("/search", stockController.searchSymbol);
router.get("/market-status", stockController.getMarketStatus);

module.exports = router;
