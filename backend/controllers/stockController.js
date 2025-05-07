"use strict";

const axios = require("axios");
const { processStockData } = require("../utils/stockUtils");

const getStockData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const {
      interval = "5min",
      adjusted,
      extendedHours,
      month,
      outputsize,
      format,
    } = req.query;

    const data = await fetchStockData(
      symbol,
      interval,
      adjusted === "false" ? false : true,
      extendedHours === "false" ? false : true,
      month,
      outputsize
    );

    if (format === "processed") {
      return res.json(processStockData(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchStockData = async (
  symbol,
  interval,
  adjusted = true,
  extendedHours = true,
  month = null,
  outputsize = "compact"
) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) throw new Error("API key not found");

    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

    url += `&adjusted=${adjusted}`;
    url += `&extended_hours=${extendedHours}`;
    if (month) url += `&month=${month}`;
    url += `&outputsize=${outputsize}`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "StockPilot/1.0.0" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    throw error;
  }
};

module.exports = {
  getStockData,
};
