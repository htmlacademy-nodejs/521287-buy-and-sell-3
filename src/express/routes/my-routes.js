'use strict';

const {Router} = require(`express`);

const api = require(`../api`).getAPI();

const ROOT = `my`;

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();

  res.render(`${ROOT}/tickets`, {pugOffers: offers});
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers({comments: true});

  res.render(`${ROOT}/comments`, {pugOffers: offers.slice(0, 3)});
});

module.exports = myRouter;
