'use strict';

const {Router} = require(`express`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const categories = require(`./categories/categories`);
const offers = require(`./offers/offers`);
const search = require(`./search/search`);
const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const app = new Router();

defineModels(sequelize);

(async () => {
  categories(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  offers(app, new OfferService(sequelize), new CommentService(sequelize));
})();

module.exports = app;
