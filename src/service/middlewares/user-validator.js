'use strict';

const Joi = require(`joi`);

const {HttpCode} = require(`../../constants`);

const schema = Joi.object({
  name: Joi.string().pattern(/[^0-9$&+,:;=?@#|'<>.^*()%!]+/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordRepeated: Joi.string().required().valid(Joi.ref(`password`)),
  avatar: Joi.string().required(),
});

module.exports = (service) => async (req, res, next) => {
  const newUser = req.body;

  try {
    await schema.validateAsync(newUser);
  } catch (error) {
    const errorMessage = error.details.map((err) => err.message).join(`/n`);

    return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
  }

  const userByEmail = await service.findByEmail(newUser.email);
  if (userByEmail) {
    const errorMessage = `Email is already in use`;

    return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
  }

  return next();
};
