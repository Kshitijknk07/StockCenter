const express = require('express');
const Joi = require('joi');
const stockController = require('../controllers/stockController');
const { validateRequest } = require('../middleware/validator');

const router = express.Router();

const candlesSchema = Joi.object({
  symbol: Joi.string().required(),
  resolution: Joi.string().valid('1', '5', '15', '30', '60', 'D', 'W', 'M').required(),
  from: Joi.number().integer().required(),
  to: Joi.number().integer().required()
});

const quoteSchema = Joi.object({
  symbol: Joi.string().required()
});

const companyProfileSchema = Joi.object({
  symbol: Joi.string().required()
});

router.get('/candles', validateRequest(candlesSchema), stockController.getCandles);
router.get('/quote', validateRequest(quoteSchema), stockController.getQuote);
router.get('/company-profile', validateRequest(companyProfileSchema), stockController.getCompanyProfile);

module.exports = router;