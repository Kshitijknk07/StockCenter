const axios = require("axios");

const BASE_URL = "https://www.alphavantage.co/query";

exports.getIntradayData = async (
  symbol,
  interval,
  adjusted = true,
  extendedHours = true,
  month = null,
  outputsize = "compact",
  datatype = "json"
) => {
  try {
    const params = {
      function: "TIME_SERIES_INTRADAY",
      symbol,
      interval,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
      adjusted: adjusted.toString(),
      extended_hours: extendedHours.toString(),
      outputsize,
      datatype,
    };

    if (month) {
      params.month = month;
    }

    const response = await axios.get(BASE_URL, { params });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.searchSymbol = async (keywords) => {
  try {
    const params = {
      function: "SYMBOL_SEARCH",
      keywords,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    };

    const response = await axios.get(BASE_URL, { params });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getMarketStatus = async () => {
  try {
    const params = {
      function: "MARKET_STATUS",
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    };

    const response = await axios.get(BASE_URL, { params });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
