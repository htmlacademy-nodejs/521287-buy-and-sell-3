'use strict';

const {Router} = require(`express`);

const categories = require(`./categories`);
const offers = require(`./offers`);
const getMockData = require(`../lib/get-mock-data`);
const {
  CategoryService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  offers(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
