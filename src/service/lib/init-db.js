'use strict';

const Aliase = require(`../models/aliase`);
const defineModels = require(`../models`);

module.exports = async (sequelize, {categories, offers, users}) => {
  const {Category, Offer, User} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({name: item}))
  );

  const userModels = await User.bulkCreate(users, {
    include: [Aliase.OFFERS, Aliase.COMMENTS],
  });

  const userIdByEmail = userModels.reduce((acc, next) => ({
    [next.email]: next.id,
    ...acc,
  }), {});

  offers.forEach((offer) => {
    offer.userId = userIdByEmail[offer.user];
    offer.comments.forEach((comment) => {
      comment.userId = userIdByEmail[comment.user];
    });
  });

  const categoryIdByName = categoryModels.reduce(
      (acc, next) => ({
        [next.name]: next.id,
        ...acc,
      }),
      {}
  );

  const offerPromises = offers.map(async (offer) => {
    const offerModel = await Offer.create(offer, {
      include: [Aliase.COMMENTS],
    });
    const offerCategories = offer.categories.map(
        (name) => categoryIdByName[name]
    );

    await offerModel.addCategories(offerCategories);
  });

  await Promise.all(offerPromises);
};
