'use strict';

const request = require(`supertest`);

const {HttpCode} = require(`../../../constants`);
const {createAPI} = require(`./utils`);
const {
  mockOffers,
  mockOfferFirstTitle,
  mockOfferFirstComments,
  mockOfferSecondTitle,
  mockOfferSecondComments,
} = require(`./mockData`);

describe(`GET /offers`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/offers`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns offer list`, () => {
    const length = response.body.length;
    const expected = mockOffers.length;

    expect(length).toBe(expected);
  });

  it(`returns right data`, () => {
    expect(response.body[0].title).toBe(mockOfferFirstTitle);
  });
});

describe(`GET /offers/{offerId}`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app).get(`/offers/2`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns right data`, () => {
    expect(response.body.title).toBe(mockOfferSecondTitle);
  });
});

describe(`POST /offers`, () => {
  describe(`+`, () => {
    const newOfferTitle = `Куплю пазлы с рисунком единорога`;
    const newOffer = {
      title: newOfferTitle,
      categories: [1, 2],
      description: `Продаю с болью в сердце...`,
      picture: `item14.jpg`,
      type: `OFFER`,
      sum: 76809,
    };
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).post(`/offers`).send(newOffer);
    });

    it(`responds with 201 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    it(`returns right data`, () => {
      expect(response.body.title).toEqual(newOfferTitle);
    });

    it(`creates new offer`, async () => {
      const offerResponse = await request(app).get(`/offers`);

      const length = offerResponse.body.length;
      const expected = mockOffers.length + 1;

      expect(length).toBe(expected);
    });
  });

  describe(`−`, () => {
    const newOffer = {
      title: `Куплю пазлы с рисунком единорога`,
      category: [`Разное`],
      description: `Продаю с болью в сердце...`,
      picture: `item14.jpg`,
      type: `offer`,
      sum: 76809,
    };
    let app;

    beforeAll(async () => {
      app = await createAPI();
    });

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
    const OFFER_ID = 4;
    const changedOfferTitle = `Дам погладить котика`;
    const changedOffer = {
      title: changedOfferTitle,
      categories: [3],
      description: `Дам погладить котика. Дорого. Не гербалайф`,
      picture: `cat.jpg`,
      type: `offer`,
      sum: 100500,
    };
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .put(`/offers/${OFFER_ID}`)
        .send(changedOffer);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`changes certain offer`, async () => {
      const offerResponse = await request(app).get(`/offers/${OFFER_ID}`);

      expect(offerResponse.body.title).toBe(changedOfferTitle);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = await createAPI();
      const validOffer = {
        title: `Это`,
        categories: [1],
        description: `валидный объект`,
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
      const app = await createAPI();
      const invalidOffer = {
        title: `Это`,
        categories: [1],
        description: `валидный объект`,
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
    const OFFER_ID = 5;
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).delete(`/offers/${OFFER_ID}`);
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`deletes certain offer`, async () => {
      const offerResponse = await request(app).get(`/offers`);

      const {length} = offerResponse.body;
      const expected = mockOffers.length - 1;

      expect(length).toBe(expected);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = await createAPI();
      const response = await request(app).delete(`/offers/NONEXISTENT`);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`GET /offers/{offerId}/comments`, () => {
  const OFFER_ID = 2;
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/offers/${OFFER_ID}/comments`);
  });

  it(`responds with 200 status code`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  it(`returns offer comment list`, () => {
    const {length} = response.body;
    const expected = mockOfferSecondComments.length;

    expect(length).toBe(expected);
  });

  it(`returns right data`, () => {
    const COMMENT_ID = 0;
    const {text} = response.body[COMMENT_ID];
    const expected = mockOfferSecondComments[COMMENT_ID].text;

    expect(text).toBe(expected);
  });
});

describe(`POST /offers/{offerId}/comments`, () => {
  describe(`+`, () => {
    const OFFER_ID = 2;
    const newCommentText = `Валидному комментарию достаточно этого поля`;
    const newComment = {
      text: newCommentText,
    };
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .post(`/offers/${OFFER_ID}/comments`)
        .send(newComment);
    });

    it(`responds with 201 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    it(`return new comment`, async () => {
      const {text} = response.body;

      expect(text).toBe(newCommentText);
    });

    it(`creates new comment`, async () => {
      const offerResponse = await request(app).get(
          `/offers/${OFFER_ID}/comments`
      );

      const length = offerResponse.body.length;
      const expected = mockOfferSecondComments.length + 1;

      expect(length).toBe(expected);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = await createAPI();
      const newComment = {
        text: `Неважно какой комментарий`,
      };

      const response = await request(app)
        .post(`/offers/NOEXIST/comments`)
        .send(newComment);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    it(`responds with 400 status code when required property is absent`, async () => {
      const app = await createAPI();
      const validComment = {
        text: `Комментарий будет невалидным без этого поля`,
      };

      const badComment = {...validComment};
      delete badComment.text;

      const response = await request(app)
        .post(`/offers/1/comments`)
        .send(badComment);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE /offers/{offerId}/comments/{commentId}`, () => {
  const OFFER_ID = 1;
  const COMMENT_ID = 1;

  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).delete(
          `/offers/${OFFER_ID}/comments/${COMMENT_ID}`
      );
    });

    it(`responds with 200 status code`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    it(`deletes certain comment`, async () => {
      const commentResponse = await request(app).get(
          `/offers/${OFFER_ID}/comments`
      );

      const length = commentResponse.body.length;
      const expected = mockOfferFirstComments.length - 1;

      expect(length).toBe(expected);
    });
  });

  describe(`−`, () => {
    it(`responds with 404 status code when offer doesn't exist`, async () => {
      const app = await createAPI();
      const response = await request(app).delete(
          `/offers/NOEXIST/comments/${COMMENT_ID}`
      );

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    it(`responds with 404 status code when comment doesn't exist`, async () => {
      const app = await createAPI();
      const response = await request(app).delete(
          `/offers/${OFFER_ID}/comments/NOEXIST`
      );

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});
