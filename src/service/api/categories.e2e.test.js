'use strict';

const request = require(`supertest`);

const {HttpCode} = require(`../../constants`);
const app = require(`../app`);

describe(`GET /categories`, () => {
  it(`responds with 200 status code`, async () => {
    const res = await request(app).get(`/api/categories`);

    expect(res.statusCode).toBe(HttpCode.OK);
  });
});
