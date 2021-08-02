'use strict';

const {ensureArray} = require(`./ensureArray`);

const buildOfferData = (req, oldPicture = null) => {
  const {body, file, session} = req;

  const {user} = session;
  const userId = user.id;
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
    userId,
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
