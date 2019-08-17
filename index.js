const assert = require("assert");
const lazyAssert = require("@testingrequired/lazy-assert").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});

module.exports.default = function multiAssert(...assertFn) {
  const errors = assertFn
    .map(fn => {
      try {
        fn.call(null);
      } catch (e) {
        return e;
      }
    })
    .filter(x => x);

  if (errors.length > 0) {
    try {
      assert.fail(errors);
    } catch (e) {
      e.errors = errors;
      throw e;
    }
  }
};

module.exports.assert = lazyAssert;
