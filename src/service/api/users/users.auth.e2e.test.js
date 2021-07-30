'use strict';

const request = require(`supertest`);

const {HttpCode} = require(`../../../constants`);
const {
  USERNAME,
  AuthValidUserData: ValidUserData,
} = require(`./mockData`);
const {createAPI} = require(`./utils`);

const ENDPOINT = `/users/auth`;

describe(`POST /users/auth`, () => {
  describe(`+`, () => {
    let response;

    beforeAll(async () => {
      const app = await createAPI();

      response = await request(app)
        .post(ENDPOINT)
        .send(ValidUserData);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`returns correct user name`, () => {
      expect(response.body.name).toBe(USERNAME);
    });
  });

  describe(`−`, () => {
    let app;

    beforeAll(async () => {
      app = await createAPI();
    });

    it(`responds with 401 status code when email is incorrect`, async () => {
      const badUserData = {
        email: `not-exist@example.com`,
        password: `petrov`,
      };
      const response = await request(app)
        .post(ENDPOINT)
        .send(badUserData);

      expect(response.statusCode).toBe(HttpCode.UNAUTHORIZED);
    });

    it(`responds with 401 status code when password is incorrect`, async () => {
      const badUserData = {
        email: `petrov@example.com`,
        password: `ivanov`,
      };
      const response = await request(app)
        .post(ENDPOINT)
        .send(badUserData);

      expect(response.statusCode).toBe(HttpCode.UNAUTHORIZED);
    });
  });
});
