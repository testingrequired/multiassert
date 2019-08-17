const { AssertionError } = require("assert");
const lazyAssert = require("@testingrequired/lazy-assert").default;
const { default: multiassert, assert } = require("./index");

jest.mock("assert");

describe("multiassert", () => {
  let assertFn, assertFn2;

  beforeEach(() => {
    assertFn = jest.fn();
    assertFn2 = jest.fn();
  });

  it("should call all assert functions", () => {
    multiassert(assertFn, assertFn2);

    expect(assertFn).toBeCalledWith();
    expect(assertFn2).toBeCalledWith();
  });

  describe("when asserts pass", () => {
    it("should not throw error", () => {
      try {
        multiassert(assertFn, assertFn2);
      } catch (e) {
        expect.fail("Should not have thrown error");
      }
    });
  });

  describe("when asserts fails", () => {
    const error = new AssertionError("error 1");
    const error2 = new AssertionError("error 2");

    beforeEach(() => {
      assertFn.mockImplementation(() => {
        throw error;
      });

      assertFn2.mockImplementation(() => {
        throw error2;
      });
    });

    it("should throw error with assertion messages", () => {
      try {
        multiassert(assertFn, assertFn2);
      } catch (e) {
        const { message } = e;

        expect(message.includes(error.message)).toBe(true);
        expect(message.includes(error2.message)).toBe(true);
      }
    });

    it("should throw error with assertion errors", () => {
      try {
        multiassert(assertFn, assertFn2);
      } catch (e) {
        const { errors } = e;

        expect(errors[0]).toBe(error);
        expect(errors[1]).toBe(error2);
      }
    });
  });
});

describe("assert", () => {
  it("should be an alias to lazyAssert", () => {
    expect(assert).toBe(lazyAssert);
  });
});
