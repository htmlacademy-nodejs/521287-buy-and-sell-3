'use strict';

/**
 * @todo (ilyasidorchik)
 * Разбить остальные функции по файлам,
 * так как их становится много
 */

const {nanoid} = require(`nanoid`);

const {readContent} = require(`./utils/readContent`);
const {buildValidationErrorMessage} = require(`./utils/buildValidationErrorMessage`);

const MAX_ID_LENGTH = 6;

const generateId = () => nanoid(MAX_ID_LENGTH);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [
      someArray[randomPosition],
      someArray[i],
    ];
  }

  return someArray;
};

const getRandomSubarray = (items) => {
  const newItems = items.slice();
  const result = [];
  let count = getRandomInt(1, newItems.length - 1);

  while (count--) {
    result.push(...newItems.splice(getRandomInt(0, newItems.length - 1), 1));
  }

  return result;
};

const getPictureFileName = (number) => `item${(`0` + number).slice(-2)}.jpg`;

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      text: shuffle(comments)
        .slice(0, getRandomInt(1, 3))
        .join(` `),
    }));

module.exports = {
  generateId,
  getRandomInt,
  shuffle,
  getRandomSubarray,
  getPictureFileName,
  generateComments,

  readContent,
  buildValidationErrorMessage,
};
