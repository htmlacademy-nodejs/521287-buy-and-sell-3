'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const {HttpCode} = require(`../../../constants`);
const initDB = require(`../../lib/init-db`);
const DataService = require(`../../data-service/categories`);
const {mockUsers} = require(`../users/mockData`);
const {mockCategories, mockOffers, mockOffersWithSecondCategory} = require(`./mockData`);
const categories = require(`./categories`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {
    categories: mockCategories,
    offers: mockOffers,
    users: mockUsers,
  });
  categories(app, new DataService(mockDB));
});

describe(`GET /categories`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns list of 3 categories`, () => {
    expect(response.body.length).toBe(3);
  });

  it(`returns right data`, () => {
    expect(response.body.map((item) => item.name)).toEqual(
        expect.arrayContaining([
          `Животные`,
          `Журналы`,
          `Игры`
        ])
    );
  });
});

describe(`GET /categories/:id`, () => {
  const CATEGORY_ID = 2;
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories/${CATEGORY_ID}`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns right data`, () => {
    const {id, name, offers} = response.body;

    expect(id).toBe(CATEGORY_ID);
    expect(name).toBe(mockCategories[1]);
    expect(offers.length).toBe(mockOffersWithSecondCategory.length);
  });
});
