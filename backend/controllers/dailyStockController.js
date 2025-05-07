"use strict";

const axios = require("axios");
const { processDailyStockData } = require("../utils/stockUtils");

const getDailyStockData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { outputsize, format } = req.query;

    const data = await fetchDailyStockData(symbol, outputsize);

    if (format === "processed") {
      return res.json(processDailyStockData(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchDailyStockData = async (symbol, outputsize = "compact") => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY_DAILY;
    if (!apiKey) throw new Error("API key for daily data not found");

    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    url += `&outputsize=${outputsize}`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "StockPilot/1.0.0" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching daily stock data:", error.message);
    throw error;
  }
};

module.exports = {
  getDailyStockData,
};
