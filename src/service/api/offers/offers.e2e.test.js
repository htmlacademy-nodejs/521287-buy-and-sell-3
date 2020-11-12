'use strict';

const request = require(`supertest`);

const {HttpCode} = require(`../../../constants`);
const {createAPI} = require(`./utils`);

describe(`GET /offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns list of 5 offers`, () => {
    expect(response.body.length).toBe(5);
  });

  it(`returns right data`, () => {
    expect(response.body[0].id).toBe(`9DBYPA`);
  });
});

describe(`GET /offers/{offerId}`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/AwWNXK`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns right data`, () => {
    expect(response.body.title).toBe(`Куплю породистого кота`);
  });
});

describe(`POST /offers`, () => {
  describe(`+`, () => {
    const app = createAPI();
    const newOffer = {
      title: `Куплю пазлы с рисунком единорога`,
      category: [`Разное`],
      description: `Продаю с болью в сердце...`,
      picture: `item14.jpg`,
      type: `offer`,
      sum: 76809,
    };
    let response;

    beforeAll(async () => {
      response = await request(app).post(`/offers`).send(newOffer);
    });

    it(`responds with 201 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    it(`returns created offer`, () => {
      expect(response.body).toEqual(expect.objectContaining(newOffer));
    });

    it(`creates new offer`, async () => {
      const offerResponse = await request(app).get(`/offers`);

      expect(offerResponse.body.length).toBe(6);
    });
  });

  describe(`−`, () => {
    const app = createAPI();
    const newOffer = {
      title: `Куплю пазлы с рисунком единорога`,
      category: [`Разное`],
      description: `Продаю с болью в сердце...`,
      picture: `item14.jpg`,
      type: `offer`,
      sum: 76809,
    };

    it(`responds with 400 status code when some required property is absent`, async () => {
      for (const key of Object.keys(newOffer)) {
        const badOffer = {...newOffer};
        delete badOffer[key];

        const response = await request(app).post(`/offers`).send(badOffer);

        expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      }
    });
  });
});

describe(`PUT /offers/{offerId}`, () => {
  describe(`+`, () => {
    const app = createAPI();
    const changedOffer = {
      title: `Дам погладить котика`,
      category: [`Котики`],
      description: `Дам погладить котика. Дорого. Не гербалайф`,
      picture: `cat.jpg`,
      type: `offer`,
      sum: 100500,
    };
    let response;

    beforeAll(async () => {
      response = await request(app).put(`/offers/M3HI0J`).send(changedOffer);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`returns changed offer`, () => {
      expect(response.body).toEqual(expect.objectContaining(changedOffer));
    });

    it(`changes certain offer`, async () => {
      const offerResponse = await request(app).get(`/offers/M3HI0J`);

      expect(offerResponse.body.title).toBe(`Дам погладить котика`);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = createAPI();
      const validOffer = {
        title: `Это`,
        category: `валидный`,
        description: `объект`,
        picture: `объявления`,
        type: `однако`,
        sum: 404,
      };
      const response = await request(app)
        .put(`/offers/NOEXIST`)
        .send(validOffer);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    it(`responds with 400 status code when some required property is absent`, async () => {
      const app = createAPI();
      const invalidOffer = {
        title: `Это`,
        category: `невалидный`,
        description: `объект`,
        picture: `объявления`,
        type: `нет поля sum`,
      };
      const response = await request(app)
        .put(`/offers/M3HI0J`)
        .send(invalidOffer);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE /offers/{offerId}`, () => {
  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app).delete(`/offers/M3HI0J`);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`returns deleted offer`, () => {
      expect(response.body.id).toBe(`M3HI0J`);
    });

    it(`deletes certain offer`, async () => {
      const offerResponse = await request(app).get(`/offers`);

      expect(offerResponse.body.length).toBe(4);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = createAPI();
      const response = await request(app).delete(`/offers/NONEXISTENT`);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`GET /offers/{offerId}/comments`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/NOdhjw/comments`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns changed offer`, () => {
    expect(response.body.length).toBe(3);
  });

  it(`returns right data`, () => {
    expect(response.body[0].id).toBe(`hbitvV`);
  });
});

describe(`POST /offers/{offerId}/comments`, () => {
  describe(`+`, () => {
    const app = createAPI();
    const newComment = {
      text: `Валидному комментарию достаточно этого поля`,
    };
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post(`/offers/NOdhjw/comments`)
        .send(newComment);
    });

    it(`responds with 201 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    it(`returns created comment`, () => {
      expect(response.body).toEqual(expect.objectContaining(newComment));
    });

    it(`creates new comment`, async () => {
      const offerResponse = await request(app).get(`/offers/NOdhjw/comments`);

      expect(offerResponse.body.length).toBe(4);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = createAPI();
      const newComment = {
        text: `Неважно какой комментарий`,
      };

      const response = await request(app)
        .post(`/offers/NOEXIST/comments`)
        .send(newComment);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    it(`responds with 400 status code when required property is absent`, async () => {
      const app = createAPI();
      const validComment = {
        text: `Комментарий будет невалидным без этого поля`,
      };

      const badComment = {...validComment};
      delete badComment.text;

      const response = await request(app)
        .post(`/offers/NOdhjw/comments`)
        .send(badComment);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE /offers/{offerId}/comments/{commentId}`, () => {
  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app).delete(`/offers/NOdhjw/comments/hbitvV`);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`returns deleted comment`, () => {
      expect(response.body.id).toBe(`hbitvV`);
    });

    it(`deletes certain comment`, async () => {
      const commentResponse = await request(app).get(`/offers/NOdhjw/comments`);

      expect(commentResponse.body.length).toBe(2);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = createAPI();
      const response = await request(app).delete(
          `/offers/NOEXIST/comments/hbitvV`
      );

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    it(`responds with 404 status code when comment doesn't exist`, async () => {
      const app = createAPI();
      const response = await request(app).delete(
          `/offers/NOdhjw/comments/NOEXIST`
      );

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});
