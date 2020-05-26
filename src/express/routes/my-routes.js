'use strict';

const {Router} = require(`express`);

const ROOT = `my`;

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`${ROOT}/tickets`));
myRouter.get(`/comments`, (req, res) => res.render(`${ROOT}/comments`));

module.exports = myRouter;
