const assert = jest.fn();

assert.fail = jest.fn(message => {
  throw new Error(message);
});

assert.AssertionError = class AssertionError extends Error {};

module.exports = assert;
