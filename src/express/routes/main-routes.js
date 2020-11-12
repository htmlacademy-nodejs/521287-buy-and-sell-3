'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const ROOT = `main`;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();

  res.render(`${ROOT}/main`, {offers});
});

mainRouter.get(`/sign-up`, (req, res) => res.render(`${ROOT}/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`${ROOT}/login`));
mainRouter.get(`/search`, (req, res) => res.render(`${ROOT}/search`));

module.exports = mainRouter;
