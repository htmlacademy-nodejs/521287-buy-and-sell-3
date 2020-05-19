'use strict';

const {Router} = require(`express`);

const offersRoutes = require(`./offers-routes`);
const myRoutes = require(`./my-routes`);
const mainRoutes = require(`./main-routes`);

const router = new Router();

router.use(`/offers`, offersRoutes);
router.use(`/my`, myRoutes);
router.use(`/`, mainRoutes);

module.exports = router;
