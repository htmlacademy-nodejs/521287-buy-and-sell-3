'use strict';

const express = require(`express`);

const {mockData} = require(`./mockData`);
const offers = require(`./offers`);
const DataService = require(`../../data-service/offers`);
const CommentService = require(`../../data-service/comments`);

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));

  app.use(express.json());

  offers(app, new DataService(cloneData), new CommentService());

  return app;
};

module.exports = {
  createAPI,
};
