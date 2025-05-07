"use strict";

const express = require("express");
const { getWeeklyStockData } = require("../controllers/weeklyStockController");

const router = express.Router();

router.get("/:symbol", getWeeklyStockData);

module.exports = router;
