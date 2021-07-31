'use strict';

const {Router} = require(`express`);

const {checkAuth} = require(`../middlewares`);
const api = require(`../api`).getAPI();

const ROOT = `my`;

const myRouter = new Router();

myRouter.get(`/`, checkAuth, async (req, res) => {
  const {user} = req.session;

  const offers = await api.getOffers();

  res.render(`${ROOT}/tickets`, {
    user,
    pugOffers: offers,
  });
});

myRouter.get(`/comments`, checkAuth, async (req, res) => {
  const {user} = req.session;

  /**
   * Здесь должно быть получение объявлений пользователя,
   * но пока нет такого функционала
   */
  const offers = await api.getOffers({comments: true});
  const pugOffers = offers.slice(0, 3);

  res.render(`${ROOT}/comments`, {
    user,
    pugOffers,
  });
});

module.exports = myRouter;
