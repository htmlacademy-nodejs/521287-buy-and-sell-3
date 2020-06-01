'use strict';

const {readFile, writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const generateOffers = (count, titles, categories, sentences) => {
  const offers = [];

  for (let i = 0; i < count; i++) {
    const category = categories[getRandomInt(0, categories.length - 1)];
    const description = shuffle(sentences).slice(1, 5).join(` `);
    const picture = getPictureFileName(
        getRandomInt(PictureRestrict.min, PictureRestrict.max)
    );
    const title = titles[getRandomInt(0, titles.length - 1)];
    const type = Object.keys(OfferType)[
      getRandomInt(0, Object.keys(OfferType).length - 1)
    ];
    const sum = getRandomInt(SumRestrict.min, SumRestrict.max);

    offers.push({
      category,
      description,
      picture,
      title,
      type,
      sum,
    });
  }

  return offers;
};

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
    const [sentences, titles, categories] = await Promise.all([
      await readContent(FILE_SENTENCES_PATH),
      await readContent(FILE_TITLES_PATH),
      await readContent(FILE_CATEGORIES_PATH),
    ]);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
        generateOffers(countOffer, sentences, titles, categories),
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
