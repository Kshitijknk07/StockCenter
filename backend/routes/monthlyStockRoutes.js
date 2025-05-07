"use strict";

const express = require("express");
const {
  getMonthlyStockData,
} = require("../controllers/monthlyStockController");

const router = express.Router();

router.get("/:symbol", getMonthlyStockData);

module.exports = router;
