'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  let i;
  let randomPosition;

  for (i = someArray.length - 1; i > 0; i--) {
    randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getPictureFileName = (number) => `item${(`0` + number).slice(-2)}.jpg`;

module.exports = {
  getRandomInt,
  shuffle,
  getPictureFileName
};
