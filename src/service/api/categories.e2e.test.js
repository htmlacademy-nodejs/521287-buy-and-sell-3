'use strict';

const request = require(`supertest`);
const server = require(`./`);

describe(`Categories API Endpoints`, () => {
  test(`When you get categories status code should be 200`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
  });
});
