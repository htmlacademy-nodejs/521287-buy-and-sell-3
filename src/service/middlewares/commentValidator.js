'use strict';

const Joi = require(`joi`);

const {HttpCode} = require(`../../constants`);
const {buildValidationErrorMessage} = require(`../../utils`);

const schema = Joi.object({
  text: Joi.string().min(20).required(),
  userId: Joi.number().integer().positive().required(),
});

module.exports = async (req, res, next) => {
  const comment = req.body;

  const {error} = await schema.validate(comment);

  if (error) {
    const errorMessage = buildValidationErrorMessage(error);

    return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
  }

  return next();
};
