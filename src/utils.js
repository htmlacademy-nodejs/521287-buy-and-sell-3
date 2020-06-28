'use strict';

const {nanoid} = require(`nanoid`);

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

const getPictureFileName = (number) => `item${(`0` + number).slice(-2)}.jpg`;

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => {
      const id = generateId();
      const text = shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `);

      return {
        id,
        text,
      };
    });

module.exports = {
  generateId,
  getRandomInt,
  shuffle,
  getPictureFileName,
  generateComments,
};
