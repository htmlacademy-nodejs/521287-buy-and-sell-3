'use strict';

const {Router} = require(`express`);

const {buildOfferData} = require(`../../utils`);
const upload = require(`../middlewares/upload`);
const api = require(`../api`).getAPI();

const ROOT = `offers`;

const offersRouter = new Router();

offersRouter.get(`/add`, async (req, res) => {
  const {user} = req.session;
  const {error} = req.query;
  const categories = await api.getCategories();

  res.render(`${ROOT}/add`, {
    user,
    categories,
    error,
  });
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const offerData = buildOfferData(req);

  try {
    await api.createOffer(offerData);

    return res.redirect(`../my`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response && error.response.data);
    const errorPath = `/offers/add?error=${errorMessage}`;

    return res.redirect(errorPath);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {error} = req.query;

  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/edit`, {
    user,
    id,
    offer,
    categories,
    error,
  });
});

offersRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {id} = req.params;

  const offerData = buildOfferData(req, req.body[`old-image`]);

  try {
    await api.editOffer(id, offerData);

    return res.redirect(`/my`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response && error.response.data);
    const errorPath = `/offers/edit/${id}/?error=${errorMessage}`;

    return res.redirect(errorPath);
  }
});

offersRouter.get(`/:id`, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const {error} = req.query;

  const offer = await api.getOffer(id, true);
  const author = offer ? offer.users : {};

  res.render(`${ROOT}/offer`, {
    user,
    id,
    pugOffer: offer,
    author,
    error
  });
});

offersRouter.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;

  try {
    await api.createComment(id, {text: comment});

    return res.redirect(`../offers/${id}`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response && error.response.data);
    const errorPath = `/offers/${id}/?error=${errorMessage}`;

    return res.redirect(errorPath);
  }
});

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
