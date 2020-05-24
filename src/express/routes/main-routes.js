'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(`/`));
mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));

module.exports = mainRouter;
