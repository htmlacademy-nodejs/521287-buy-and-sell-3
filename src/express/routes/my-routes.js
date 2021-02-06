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
  /**
   * Здесь должно быть получение объявлений пользователя,
   * но пока нет такого функционала
   */
  const offers = await api.getOffers({comments: true});
  const pugOffers = offers.slice(0, 3);

  res.render(`${ROOT}/comments`, {pugOffers});
});

module.exports = myRouter;
