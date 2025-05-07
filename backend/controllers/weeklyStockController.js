"use strict";

const axios = require("axios");
const { processWeeklyStockData } = require("../utils/stockUtils");

const getWeeklyStockData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { format } = req.query;

    const data = await fetchWeeklyStockData(symbol);

    if (format === "processed") {
      return res.json(processWeeklyStockData(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchWeeklyStockData = async (symbol) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY_WEEKLY;
    if (!apiKey) throw new Error("API key for weekly data not found");

    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "StockPilot/1.0.0" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weekly stock data:", error.message);
    throw error;
  }
};

module.exports = {
  getWeeklyStockData,
};
