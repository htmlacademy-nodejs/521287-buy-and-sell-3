'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const ROOT = `my`;

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const _offers = await api.getOffers();

  res.render(`${ROOT}/tickets`, {_offers});
});
myRouter.get(`/comments`, (req, res) => res.render(`${ROOT}/comments`));

module.exports = myRouter;
