"use strict";

const axios = require("axios");
const { processMonthlyStockData } = require("../utils/stockUtils");

const getMonthlyStockData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { format } = req.query;

    const data = await fetchMonthlyStockData(symbol);

    if (format === "processed") {
      return res.json(processMonthlyStockData(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchMonthlyStockData = async (symbol) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY_MONTHLY;
    if (!apiKey) throw new Error("API key for monthly data not found");

    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "StockPilot/1.0.0" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching monthly stock data:", error.message);
    throw error;
  }
};

module.exports = {
  getMonthlyStockData,
};
