'use strict';

const {Router} = require(`express`);

const {checkAuth} = require(`../middlewares`);
const api = require(`../api`).getAPI();

const ROOT = `my`;

const myRouter = new Router();

myRouter.get(`/`, checkAuth, async (req, res) => {
  const {user} = req.session;
  const offers = await api.getOffers();

  const userOffers = offers.filter(({userId}) => userId === user.id);

  res.render(`${ROOT}/tickets`, {
    user,
    userOffers,
  });
});

myRouter.get(`/comments`, checkAuth, async (req, res) => {
  const {user} = req.session;
  const offers = await api.getOffers({comments: true});

  const userOffers = offers.filter(({userId}) => userId === user.id);

  res.render(`${ROOT}/comments`, {
    user,
    userOffers,
  });
});

module.exports = myRouter;
