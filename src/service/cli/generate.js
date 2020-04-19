"use strict";

const fs = require(`fs`);
const chalk = require(`chalk`);

const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);
const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  OFFER_TYPE,
  SUM_RESTRICT,
  PICTURE_RESTRICT
} = require(`../../data.js`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => {
  const TYPE = Object.keys(OFFER_TYPE);

  return Array(count)
    .fill({})
    .map(() => ({
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
      description: shuffle(SENTENCES)
        .slice(1, 5)
        .join(` `),
      picture: getPictureFileName(
          getRandomInt(PICTURE_RESTRICT.min, PICTURE_RESTRICT.max)
      ),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      type: TYPE[getRandomInt(0, TYPE.length - 1)],
      sum: getRandomInt(SUM_RESTRICT.min, SUM_RESTRICT.max)
    }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(chalk.red(`Can't write data to file...`));
      }

      return console.log(chalk.green(`Operation success. File created.`));
    });
  }
};
