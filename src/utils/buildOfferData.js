'use strict';

const {ensureArray} = require(`./ensureArray`);

const buildOfferData = (req, oldPicture = null) => {
  const {body, file} = req;

  const {
    title,
    price: sum,
    action: type,
    comment: description,
    category,
  } = body;
  const picture = file ? file.filename : oldPicture;
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
