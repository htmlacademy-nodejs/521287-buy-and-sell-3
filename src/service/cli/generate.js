'use strict';

const {readFile, writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  generateId,
  getRandomInt,
  shuffle,
  getPictureFileName,
  generateComments,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
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

const generateOffers = (count, titles, categoryList, sentences, commentList) =>
  Array(count).fill({}).map(() => {
    const id = generateId();
    const categories = [categoryList[getRandomInt(0, categoryList.length - 1)]];
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
        commentList
    );

    return {
      id,
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
  name: `--generate`,
  async run(args) {
    const [sentences, titles, categories, comments] = await Promise.all([
      await readContent(FILE_SENTENCES_PATH),
      await readContent(FILE_TITLES_PATH),
      await readContent(FILE_CATEGORIES_PATH),
      await readContent(FILE_COMMENTS_PATH),
    ]);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
        generateOffers(countOffer, titles, categories, sentences, comments),
        null,
        2
    );

    try {
      await writeFile(FILE_NAME, content);

      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
