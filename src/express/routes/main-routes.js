'use strict';

const {Router} = require(`express`);

const upload = require(`../middlewares/upload`);
const api = require(`../api`).getAPI();

const ROOT = `main`;
const OFFERS_PER_PAGE = 8;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  // Получаем номер страницы
  let {page = 1} = req.query;
  page = +page;

  // Количество запрашиваемых объявлений
  // равно количеству объявлений на странице
  const limit = OFFERS_PER_PAGE;

  // Количество объявлений, которое нам нужно пропустить, —
  // это количество объявлений на предыдущих страницах
  const offset = (page - 1) * OFFERS_PER_PAGE;
  const [
    {count, offers},
    categories
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories(true)
  ]);

  // Количество страниц — это общее количество объявлений,
  // поделённое на количество объявлений на странице
  // (с округлением вверх)
  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  // Передаём собранные данные в шаблон
  res.render(`${ROOT}/main`, {pugOffers: offers, categories, page, totalPages});
});

mainRouter.get(`/search`, async (req, res) => {
  let result = [];

  try {
    const {search} = req.query;

    result = await api.search(search);
  } catch (error) {
    result = [];
  }

  res.render(`${ROOT}/search`, {result});
});

mainRouter.get(`/sign-up`, (req, res) => {
  const {error} = req.query;

  res.render(`${ROOT}/sign-up`, {error});
});

mainRouter.post(`/sign-up`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {
    name,
    email,
    password,
    passwordRepeated,
  } = body;
  const avatar = file ? file.filename : null;
  const userData = {
    name,
    email,
    password,
    passwordRepeated,
    avatar,
  };

  try {
    await api.createUser(userData);

    res.redirect(`/login`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response.data);

    res.redirect(`/sign-up?error=${errorMessage}`);
  }
});

mainRouter.get(`/login`, (req, res) => {
  const {error} = req.query;

  res.render(`${ROOT}/login`, {error});
});

mainRouter.post(`/login`, async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await api.auth(email, password);

    req.session.user = user;
    res.redirect(`/`);
  } catch (error) {
    const errorMessage = encodeURIComponent(error.response.data);

    res.redirect(`/login?error=${errorMessage}`);
  }
});

mainRouter.get(`/logout`, (req, res) => {
  delete req.session.user;

  res.redirect(`/`);
});

module.exports = mainRouter;
