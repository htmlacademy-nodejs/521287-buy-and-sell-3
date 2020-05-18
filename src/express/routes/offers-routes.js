'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();
const ROOT = `/offers`;

offersRouter.get(`/category/:id`, (req, res) =>
  res.send(`${ROOT}${req.url}`)
);
offersRouter.get(`/add`, (req, res) => res.send(`${ROOT}/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`${ROOT}${req.url}`));
offersRouter.get(`/:id`, (req, res) => res.send(`${ROOT}${req.url}`));

module.exports = offersRouter;
