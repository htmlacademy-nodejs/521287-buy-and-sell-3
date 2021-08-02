'use strict';

const {Router} = require(`express`);
const csrf = require(`csurf`);

const {buildOfferData} = require(`../../utils`);
const {checkAuth, upload} = require(`../middlewares`);
const api = require(`../api`).getAPI();

const ROOT = `offers`;

const offersRouter = new Router();
const csrfProtection = csrf();

offersRouter.get(`/add`, checkAuth, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {error} = req.query;
  const categories = await api.getCategories();
  const csrfToken = req.csrfToken();

  res.render(`${ROOT}/add`, {
    user,
    categories,
    error,
    csrfToken,
  });
});

offersRouter.post(
    `/add`,
    checkAuth,
    upload.single(`avatar`),
    csrfProtection,
    async (req, res) => {
      const offerData = buildOfferData(req);

      try {
        await api.createOffer(offerData);

        return res.redirect(`../my`);
      } catch (error) {
        const errorMessage = encodeURIComponent(
            error.response && error.response.data
        );
        const errorPath = `/offers/add?error=${errorMessage}`;

        return res.redirect(errorPath);
      }
    }
);

offersRouter.get(`/edit/:id`, checkAuth, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {error} = req.query;
  const csrfToken = req.csrfToken();

  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories(),
  ]);
  const offerCategories = offer.categories;

  res.render(`${ROOT}/edit`, {
    user,
    id,
    offer,
    offerCategories,
    categories,
    error,
    csrfToken,
  });
});

offersRouter.post(
    `/edit/:id`,
    checkAuth,
    upload.single(`avatar`),
    csrfProtection,
    async (req, res) => {
      const {id} = req.params;

      const offerData = buildOfferData(req, req.body[`old-image`]);

      try {
        await api.editOffer(id, offerData);

        return res.redirect(`/my`);
      } catch (error) {
        const errorMessage = encodeURIComponent(
            error.response && error.response.data
        );
        const errorPath = `/offers/edit/${id}/?error=${errorMessage}`;

        return res.redirect(errorPath);
      }
    }
);

offersRouter.get(`/:id`, csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {error} = req.query;
  const csrfToken = req.csrfToken();

  const offer = await api.getOffer(id, true);
  const author = offer ? offer.users : {};

  res.render(`${ROOT}/offer`, {
    user,
    id,
    pugOffer: offer,
    author,
    error,
    csrfToken,
  });
});

offersRouter.post(
    `/:id/comments`,
    checkAuth,
    csrfProtection,
    async (req, res) => {
      const {user} = req.session;
      const {id} = req.params;
      const {comment} = req.body;

      try {
        await api.createComment(id, {
          userId: user.id,
          text: comment,
        });

        return res.redirect(`/offers/${id}`);
      } catch (error) {
        const errorMessage = encodeURIComponent(
            error.response && error.response.data
        );
        const errorPath = `/offers/${id}/?error=${errorMessage}`;

        return res.redirect(errorPath);
      }
    }
);

offersRouter.get(`/category/:id`, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;

  const [category, categories] = await Promise.all([
    api.getCategory(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/category`, {
    user,
    categories,
    category,
  });
});

module.exports = offersRouter;
