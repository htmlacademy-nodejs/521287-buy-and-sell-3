'use strict';

const {Router} = require(`express`);

const api = require(`../api`).getAPI();

const ROOT = `offers`;

const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.render(`${ROOT}/category`));
offersRouter.get(`/add`, (req, res) => res.render(`${ROOT}/add`));

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/edit`, {offer, categories});
});

offersRouter.get(`/:id`, (req, res) => res.render(`${ROOT}/offer`));

module.exports = offersRouter;
