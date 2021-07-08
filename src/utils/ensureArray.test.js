'use strict';

const {ensureArray} = require(`./ensureArray`);

describe(`Function ensureArray`, () => {
  it(`returns array for array`, () => {
    const ARRAY = [1, `element`, 3];
    const expected = ARRAY;
    const result = ensureArray(ARRAY);

    expect(result).toStrictEqual(expected);
  });

  it(`makes array out of value`, () => {
    const VALUE = `element`;
    const expected = [VALUE];
    const result = ensureArray(VALUE);

    expect(result).toStrictEqual(expected);
  });
});
