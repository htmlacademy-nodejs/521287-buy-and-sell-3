'use strict';

const express = require(`express`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const DataService = require(`../../data-service/offers`);
const CommentService = require(`../../data-service/comments`);
const {mockUsers} = require(`../users/mockData`);
const {mockCategories, mockOffers} = require(`./mockData`);
const offers = require(`./offers`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

  const app = express();
  app.use(express.json());

  await initDB(mockDB, {
    categories: mockCategories,
    offers: mockOffers,
    users: mockUsers,
  });
  offers(app, new DataService(mockDB), new CommentService(mockDB));

  return app;
};

module.exports = {
  createAPI,
};
