'use strict';

const {Router} = require(`express`);

const {
  checkAuth,
  checkNotAuth,
  upload,
} = require(`../middlewares`);
const api = require(`../api`).getAPI();

const ROOT = `main`;
const OFFERS_PER_PAGE = 8;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const {user} = req.session;

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
  res.render(`${ROOT}/main`, {
    user,
    pugOffers: offers,
    categories,
    page,
    totalPages,
  });
});

mainRouter.get(`/search`, async (req, res) => {
  const {user} = req.session;
  let result = [];

  try {
    const {search} = req.query;

    result = await api.search(search);
  } catch (error) {
    result = [];
  }

  res.render(`${ROOT}/search`, {
    user,
    result
  });
});

mainRouter.get(`/register`, checkNotAuth, (req, res) => {
  const {error} = req.query;

  res.render(`${ROOT}/register`, {error});
});

mainRouter.post(`/register`, checkNotAuth, upload.single(`avatar`), async (req, res) => {
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

    res.redirect(`/register?error=${errorMessage}`);
  }
});

mainRouter.get(`/login`, checkNotAuth, (req, res) => {
  const {error} = req.query;

  res.render(`${ROOT}/login`, {error});
});

mainRouter.post(`/login`, checkNotAuth, async (req, res) => {
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

mainRouter.get(`/logout`, checkAuth, (req, res) => {
  delete req.session.user;

  res.redirect(`/`);
});

module.exports = mainRouter;
