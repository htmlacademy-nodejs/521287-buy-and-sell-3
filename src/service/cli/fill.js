'use strict';

const {writeFile} = require(`fs`).promises;

const {getLogger} = require(`../lib/logger`);
const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  readContent,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `db/fill-db.sql`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const MAX_COMMENTS = 4;

const OfferType = {
  OFFER: `OFFER`,
  SALE: `SALE`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const logger = getLogger({name: `fill`});

const generateComments = (count, offerId, userCount, comments) =>
  Array(count)
    .fill({})
    .map(() => {
      const userId = getRandomInt(1, userCount);
      const text = shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `);

      return {
        userId,
        offerId,
        text,
      };
    });

const generateOffers = (
    count,
    titles,
    categoryCount,
    userCount,
    sentences,
    commentList
) =>
  Array(count)
    .fill({})
    .map((_, index) => {
      const categories = [getRandomInt(1, categoryCount)];
      const description = shuffle(sentences).slice(1, 5).join(` `);
      const picture = getPictureFileName(
          getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      );
      const title = titles[getRandomInt(0, titles.length - 1)];
      const type = Object.values(OfferType)[
        getRandomInt(0, Object.values(OfferType).length - 1)
      ];
      const sum = getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
      const comments = generateComments(
          getRandomInt(1, MAX_COMMENTS),
          index + 1,
          userCount,
          commentList
      );
      const userId = getRandomInt(1, userCount);

      return {
        categories,
        description,
        picture,
        title,
        type,
        sum,
        comments,
        userId,
      };
    });

module.exports = {
  name: `--fill`,
  async run(args) {
    const [
      sentences,
      titles,
      categories,
      commentSentences,
    ] = await Promise.all([
      readContent(FILE_SENTENCES_PATH, logger),
      readContent(FILE_TITLES_PATH, logger),
      readContent(FILE_CATEGORIES_PATH, logger),
      readContent(FILE_COMMENTS_PATH, logger),
    ]);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`,
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`,
      },
    ];

    const offers = generateOffers(
        countOffer,
        titles,
        categories.length,
        users.length,
        sentences,
        commentSentences
    );

    const comments = offers.flatMap((offer) => offer.comments);
    const offerCategories = offers.map((offer, index) => ({
      offerId: index + 1,
      categoryId: offer.categories[0],
    }));

    const userValues = users
      .map(
          ({email, passwordHash, firstName, lastName, avatar}) =>
            `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
      )
      .join(`,\n`);

    const categoryValues = categories
      .map((name) => `('${name}', now(), now())`)
      .join(`,\n`);

    const offerValues = offers
      .map(
          ({title, description, type, sum, picture, userId}) =>
            `('${title}', '${description}', '${type}', ${sum}, '${picture}', ${userId}, now(), now())`
      )
      .join(`,\n`);

    const offerCategoryValues = offerCategories
      .map(({offerId, categoryId}) => `(${offerId}, ${categoryId})`)
      .join(`,\n`);

    const commentValues = comments
      .map(
          ({text, userId, offerId}) =>
            `('${text}', ${userId}, ${offerId}, now(), now())`
      )
      .join(`,\n`);

    const content = `
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
${userValues};

INSERT INTO categories(name, "createdAt", "updatedAt") VALUES
${categoryValues};

ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id, "createdAt", "updatedAt") VALUES
${offerValues};
ALTER TABLE offers ENABLE TRIGGER ALL;

ALTER TABLE offer_categories DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id) VALUES
${offerCategoryValues};
ALTER TABLE offer_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, "offerId", "createdAt", "updatedAt") VALUES
${commentValues};
ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await writeFile(FILE_NAME, content);

      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  },
};
