const stockService = require("../services/stockService");

exports.getIntradayData = async (req, res) => {
  try {
    const {
      symbol,
      interval,
      adjusted,
      extendedHours,
      month,
      outputsize,
      datatype,
    } = req.query;

    if (!symbol || !interval) {
      return res
        .status(400)
        .json({ error: "Symbol and interval are required parameters" });
    }

    if (!["1min", "5min", "15min", "30min", "60min"].includes(interval)) {
      return res
        .status(400)
        .json({
          error: "Interval must be one of: 1min, 5min, 15min, 30min, 60min",
        });
    }

    const parsedAdjusted = adjusted === "false" ? false : true;
    const parsedExtendedHours = extendedHours === "false" ? false : true;

    const data = await stockService.getIntradayData(
      symbol,
      interval,
      parsedAdjusted,
      parsedExtendedHours,
      month,
      outputsize,
      datatype
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchSymbol = async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      return res.status(400).json({ error: "Keywords parameter is required" });
    }

    const data = await stockService.searchSymbol(keywords);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMarketStatus = async (req, res) => {
  try {
    const data = await stockService.getMarketStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
