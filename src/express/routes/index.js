'use strict';

const {Router} = require(`express`);
const router = new Router();

const offersRoutes = require(`./offers-routes`);
const myRoutes = require(`./my-routes`);
const mainRoutes = require(`./main-routes`);

router.use(`/offers`, offersRoutes);
router.use(`/my`, myRoutes);
router.use(`/`, mainRoutes);

module.exports = router;
