'use strict';

const {Router} = require(`express`);

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

mainRouter.get(`/sign-up`, (req, res) => res.render(`${ROOT}/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`${ROOT}/login`));

module.exports = mainRouter;
