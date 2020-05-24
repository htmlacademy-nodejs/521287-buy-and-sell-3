'use strict';

const {Router} = require(`express`);

const myRouter = new Router();
const ROOT = `/my`;

myRouter.get(`/`, (req, res) => res.send(ROOT));
myRouter.get(`/comments`, (req, res) => res.render(`my/comments`));

module.exports = myRouter;
