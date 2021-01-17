'use strict';

const {readFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getRandomSubarray,
  getPictureFileName,
  generateComments,
} = require(`../../utils`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const DEFAULT_COUNT = 1;
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

const logger = getLogger({name: `filldb`});

const generateOffers = (count, titles, categoryList, sentences, commentList) =>
  Array(count)
    .fill({})
    .map(() => {
      const categories = getRandomSubarray(categoryList);
      const description = shuffle(sentences).slice(1, 5).join(` `);
      const picture = getPictureFileName(
          getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      );
      const title = titles[getRandomInt(0, titles.length - 1)];
      const type = Object.keys(OfferType)[
        getRandomInt(0, Object.values(OfferType).length - 1)
      ];
      const sum = getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
      const comments = generateComments(
          getRandomInt(1, MAX_COMMENTS),
          commentList
      );

      return {
        categories,
        description,
        picture,
        title,
        type,
        sum,
        comments,
      };
    });

const readContent = async (filePath) => {
  try {
    const content = await readFile(filePath, `utf-8`);

    return content.split(`\n`).filter((item) => item !== ``);
  } catch (err) {
    console.error(chalk.red(err));

    return [];
  }
};

module.exports = {
  name: `--fill-db`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (error) {
      logger.error(`An error occured: ${error.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database was established`);

    const [sentences, titles, categories, comments] = await Promise.all([
      await readContent(FILE_SENTENCES_PATH),
      await readContent(FILE_TITLES_PATH),
      await readContent(FILE_CATEGORIES_PATH),
      await readContent(FILE_COMMENTS_PATH),
    ]);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(
        countOffer,
        titles,
        categories,
        sentences,
        comments
    );

    return initDatabase(sequelize, {offers, categories});
  },
};
