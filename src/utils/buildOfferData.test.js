'use strict';

const {OfferType} = require(`../constants`);
const {buildOfferData} = require(`./buildOfferData`);

jest.mock(`./ensureArray`);
const {ensureArray} = require(`./ensureArray`);
ensureArray.mockImplementation((value) => value);

describe(`Function buildOfferData`, () => {
  const TITLE = `Заголовок`;
  const DESCRIPTION = `Описание`;
  const TYPE = OfferType.OFFER;
  const SUM = 0;
  const CATEGORIES = [1, 2, 3];

  it(`returns data with picture in request`, () => {
    const PICTURE = `picture001.jpg`;
    const USER_ID = 1;
    const REQ = {
      body: {
        title: TITLE,
        comment: DESCRIPTION,
        price: SUM,
        action: TYPE,
        category: CATEGORIES,
      },
      file: {
        filename: PICTURE,
      },
      session: {
        user: {
          id: USER_ID
        }
      }
    };

    const expected = {
      title: TITLE,
      description: DESCRIPTION,
      type: TYPE,
      sum: SUM,
      categories: CATEGORIES,
      picture: PICTURE,
      userId: USER_ID
    };
    const result = buildOfferData(REQ);

    expect(result).toEqual(expected);
  });

  it(`returns data with old picture in parameter`, () => {
    const OLD_PICTURE = `old-picture001.jpg`;
    const REQ = {
      body: {
        title: TITLE,
        comment: DESCRIPTION,
        price: SUM,
        action: TYPE,
        category: CATEGORIES,
      },
      session: {
        user: {
          id: `1`
        }
      }
    };

    const expected = {
      title: TITLE,
      description: DESCRIPTION,
      type: TYPE,
      sum: SUM,
      categories: CATEGORIES,
      picture: OLD_PICTURE,
      userId: `1`
    };
    const result = buildOfferData(REQ, OLD_PICTURE);

    expect(result).toEqual(expected);
  });
});
