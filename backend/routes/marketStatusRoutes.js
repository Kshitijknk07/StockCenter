"use strict";

const express = require("express");
const { getMarketStatus } = require("../controllers/marketStatusController");

const router = express.Router();

router.get("/", getMarketStatus);

module.exports = router;
