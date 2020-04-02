"use strict";

const fs = require(`fs`);

const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);
const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`../../data.js`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
      description: shuffle(SENTENCES)
        .slice(1, 5)
        .join(` `),
      picture: getPictureFileName(
          getRandomInt(PictureRestrict.min, PictureRestrict.max)
      ),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      type: Object.keys(OfferType)[
        getRandomInt(0, Object.keys(OfferType).length - 1)
      ],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max)
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.log(`Operation success. File created.`);
    });
  }
};
