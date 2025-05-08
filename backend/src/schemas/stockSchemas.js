const Joi = require("joi");

const marketStatusSchema = Joi.object({
  exchange: Joi.string().required(),
});

const marketHolidaySchema = Joi.object({
  exchange: Joi.string().required(),
});

const insiderTransactionsSchema = Joi.object({
  symbol: Joi.string().required(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
});

const insiderSentimentSchema = Joi.object({
  symbol: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
});

const financialsReportedSchema = Joi.object({
  symbol: Joi.string().optional(),
  cik: Joi.string().optional(),
  accessNumber: Joi.string().optional(),
  freq: Joi.string().valid("annual", "quarterly").optional(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
}).or("symbol", "cik", "accessNumber");

module.exports = {
  marketStatusSchema,
  marketHolidaySchema,
  insiderTransactionsSchema,
  insiderSentimentSchema,
  financialsReportedSchema,
};
