'use strict';

const Joi = require(`joi`);

const {HttpCode} = require(`../../constants`);
const {buildValidationErrorMessage} = require(`../../utils`);

const schema = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  description: Joi.string().min(50).max(1000).required(),
  picture: Joi.string().required(),
  type: Joi.any().valid(`OFFER`, `SALE`).required(),
  sum: Joi.number().integer().greater(100).required(),
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(1).required(),
  userId: Joi.number().integer().positive().required(),
});

module.exports = async (req, res, next) => {
  const newOffer = req.body;

  const {error} = await schema.validateAsync(newOffer);

  if (error) {
    const errorMessage = buildValidationErrorMessage(error);

    return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
  }

  return next();
};
