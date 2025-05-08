const stockService = require("../services/stockService");
const { logger } = require("../utils/logger");

exports.getMarketStatus = async (req, res, next) => {
  try {
    const { exchange } = req.query;
    const data = await stockService.getMarketStatus(exchange);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getMarketHoliday = async (req, res, next) => {
  try {
    const { exchange } = req.query;
    const data = await stockService.getMarketHoliday(exchange);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getInsiderTransactions = async (req, res, next) => {
  try {
    const { symbol, from, to } = req.query;
    const data = await stockService.getInsiderTransactions(symbol, from, to);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getInsiderSentiment = async (req, res, next) => {
  try {
    const { symbol, from, to } = req.query;
    const data = await stockService.getInsiderSentiment(symbol, from, to);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getFinancialsReported = async (req, res, next) => {
  try {
    const { symbol, cik, accessNumber, freq, from, to } = req.query;
    const params = {};

    if (symbol) params.symbol = symbol;
    if (cik) params.cik = cik;
    if (accessNumber) params.accessNumber = accessNumber;
    if (freq) params.freq = freq;
    if (from) params.from = from;
    if (to) params.to = to;

    const data = await stockService.getFinancialsReported(params);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getCandles = async (req, res, next) => {
  try {
    const { symbol, resolution, from, to } = req.query;

    const data = await stockService.getCandles(symbol, resolution, from, to);

    if (data.s === "no_data") {
      return res.status(404).json({
        success: false,
        error: {
          message: "No data found for the specified parameters",
        },
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuote = async (req, res, next) => {
  try {
    const { symbol } = req.query;

    const data = await stockService.getQuote(symbol);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyProfile = async (req, res, next) => {
  try {
    const { symbol } = req.query;

    const data = await stockService.getCompanyProfile(symbol);

    if (Object.keys(data).length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Company profile not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
