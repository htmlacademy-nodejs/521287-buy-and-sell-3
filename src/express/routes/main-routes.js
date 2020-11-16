'use strict';

const {Router} = require(`express`);

const api = require(`../api`).getAPI();

const ROOT = `main`;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const _offers = await api.getOffers();

  res.render(`${ROOT}/main`, {_offers});
});

mainRouter.get(`/search`, async (req, res) => {
  let result = [];

  try {
    const {search} = req.query;

    result = await api.search(search);
  } catch (error) {
    result = [];
  }

  res.render(`${ROOT}/search`, {result});
});

mainRouter.get(`/sign-up`, (req, res) => res.render(`${ROOT}/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`${ROOT}/login`));

module.exports = mainRouter;
