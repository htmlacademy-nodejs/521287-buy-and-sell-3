'use strict';

const {ensureArray} = require(`../../utils`);

const buildOfferData = (req, defaultPicture = null) => {
  const {body, file} = req;

  const title = req.body[`ticket-name`];
  const {
    price: sum,
    action: type,
    comment: description,
    category,
  } = body;
  const picture = file ? file.filename : defaultPicture;
  const categories = ensureArray(category);

  return {
    title,
    description,
    type,
    picture,
    sum,
    categories,
  };
};

module.exports = {
  buildOfferData,
};
