'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {ensureArray} = require(`../../utils`);
const api = require(`../api`).getAPI();

const ROOT = `offers`;
const UPLOAD_DIR = `../upload/img`;

const offersRouter = new Router();
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();

    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.get(`/add`, async (req, res) => {
  const {error} = req.query;
  const categories = await api.getCategories();

  res.render(`${ROOT}/add`, {categories, error});
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const title = req.body[`ticket-name`];
  const {
    price: sum,
    action: type,
    comment: description,
    category,
  } = body;
  const picture = file ? file.filename : null;
  const categories = ensureArray(category);

  const offerData = {
    title,
    description,
    type,
    picture,
    sum,
    categories,
  };

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
  const {id} = req.params;
  const {error} = req.query;

  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/edit`, {id, offer, categories, error});
});

offersRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body, file, params} = req;
  const {id} = params;

  const title = req.body[`ticket-name`];
  const {
    price: sum,
    action: type,
    comment: description,
    category,
  } = body;
  const categories = ensureArray(category);
  const picture = file ? file.filename : body[`old-image`];

  const offerData = {
    title,
    description,
    type,
    picture,
    sum,
    categories,
  };

  try {
    await api.editOffer(offerData);

    return res.redirect(`../my`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response && error.response.data);
    const errorPath = `/offers/edit/${id}/?error=${errorMessage}`;

    return res.redirect(errorPath);
  }
});

offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;

  const offer = await api.getOffer(id, true);

  res.render(`${ROOT}/offer`, {id, pugOffer: offer, error});
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
  const {id} = req.params;

  const [category, categories] = await Promise.all([
    api.getCategory(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/category`, {categories, category});
});

module.exports = offersRouter;
