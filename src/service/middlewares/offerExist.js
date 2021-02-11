'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => async (req, res, next) => {
  const {offerId} = req.params;
  const {comments = null} = req.query;

  const offer = await service.findOne(offerId, comments);

  if (!offer) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Offer with ${offerId} wasn't found`);
  }

  res.locals.offer = offer;

  return next();
};
