'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const {HttpCode} = require(`../../../constants`);
const initDB = require(`../../lib/init-db`);
const DataService = require(`../../data-service/categories`);
const {mockCategories, mockOffers} = require(`./mockData`);
const categories = require(`./categories`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
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
