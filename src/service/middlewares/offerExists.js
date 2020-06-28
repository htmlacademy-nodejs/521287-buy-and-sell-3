'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(HttpCode.BAD_REQUEST)
       .send(`Offer with ${offerId} isn't found`);
  }

  res.locals.offer = offer;

  return next();
};
