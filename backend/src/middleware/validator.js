const Joi = require("joi");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);

    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          message: error.details[0].message,
        },
      });
    }

    next();
  };
};

module.exports = {
  validateRequest,
};
