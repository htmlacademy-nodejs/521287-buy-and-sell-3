'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const ROOT = `/offers`;

offersRouter.get(`/category/:id`, (req, res) => res.send(`${ROOT}/category/:id`));
offersRouter.get(`/add`, (req, res) => res.send(`${ROOT}/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`${ROOT}/edit/:id`));
offersRouter.get(`/:id`, (req, res) => res.send(`${ROOT}/:id`));

module.exports = offersRouter;
