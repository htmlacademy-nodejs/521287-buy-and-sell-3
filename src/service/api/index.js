'use strict';

const {Router} = require(`express`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const categories = require(`./categories/categories`);
const search = require(`./search/search`);
const offers = require(`./offers/offers`);
const users = require(`./users/users`);
const {
  CategoryService,
  SearchService,
  CommentService,
  OfferService,
  UserService,
} = require(`../data-service`);

const app = new Router();

defineModels(sequelize);

(async () => {
  categories(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  offers(app, new OfferService(sequelize), new CommentService(sequelize));
  users(app, new UserService(sequelize));
})();

module.exports = app;
