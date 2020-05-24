'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();
const ROOT = `offers`;

offersRouter.get(`/category/:id`, (req, res) => res.render(`${ROOT}/category`));
offersRouter.get(`/add`, (req, res) => res.render(`${ROOT}/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`${ROOT}/edit`));
offersRouter.get(`/:id`, (req, res) => res.render(`${ROOT}/offer`));

module.exports = offersRouter;
