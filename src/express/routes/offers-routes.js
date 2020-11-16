'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

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

offersRouter.get(`/add`, (req, res) => res.render(`${ROOT}/add`));
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {file: {
    filename: picture,
  }, body: {
    price: sum,
    action: type,
    comment: description,
    category: categories,
  }} = req;

  const offerData = {
    picture,
    sum,
    type,
    description,
    title: req.body[`ticket-name`],
    categories,
  };

  try {
    await api.createOffer(offerData);
    return res.redirect(`../my`);
  } catch (e) {
    return res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories(),
  ]);

  res.render(`${ROOT}/edit`, {offer, categories});
});

offersRouter.get(`/category/:id`, (req, res) => res.render(`${ROOT}/category`));
offersRouter.get(`/:id`, (req, res) => res.render(`${ROOT}/offer`));

module.exports = offersRouter;
