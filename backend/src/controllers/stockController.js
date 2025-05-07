const stockService = require('../services/stockService');
const { logger } = require('../utils/logger');

exports.getCandles = async (req, res, next) => {
  try {
    const { symbol, resolution, from, to } = req.query;
    
    const data = await stockService.getCandles(symbol, resolution, from, to);
    
    if (data.s === 'no_data') {
      return res.status(404).json({
        success: false,
        error: {
          message: 'No data found for the specified parameters'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data
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
      data
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
          message: 'Company profile not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};