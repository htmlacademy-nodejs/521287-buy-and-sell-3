'use strict';

const Aliase = require(`../models/aliase`);
const defineModels = require(`../models`);

module.exports = async (sequelize, {categories, offers}) => {
  const {Category, Offer} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({name: item}))
  );

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
