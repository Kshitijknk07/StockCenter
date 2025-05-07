"use strict";

const axios = require("axios");

const getMarketStatus = async (req, res) => {
  try {
    const data = await fetchMarketStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchMarketStatus = async () => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY_MARKET_STATUS;
    if (!apiKey) throw new Error("API key for market status not found");

    let url = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${apiKey}`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "StockPilot/1.0.0" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching market status data:", error.message);
    throw error;
  }
};

module.exports = {
  getMarketStatus,
};
