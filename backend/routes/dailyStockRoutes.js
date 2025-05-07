"use strict";

const express = require("express");
const { getDailyStockData } = require("../controllers/dailyStockController");

const router = express.Router();

router.get("/:symbol", getDailyStockData);

module.exports = router;
