'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const ROOT = `/my`;

myRouter.get(`/`, (req, res) => res.send(ROOT));
myRouter.get(`/comments`, (req, res) => res.send(`${ROOT}/comments`));

module.exports = myRouter;
