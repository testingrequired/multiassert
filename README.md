# @testingrequired/multiassert

Multiple assertions

## Install

```bash
$ npm i -D @testingrequired/multiassert
```

## Usage

```javascript
import multiassert, { assert } from "@testingrequired/multiassert";

const point = {
  x: 1
};

try {
  multiassert(
    assert(point.x, "x not defined"),
    assert(point.y, "y not defined"),
    assert(point.z, "z not defined")
  );
} catch (e) {
  e.message === "AssertionError: y undefined,AssertionError: z undefined";
  e.errors[0].message === "AssertionError: y undefined";
  e.errors[1].message === "AssertionError: z undefined";
}
```

### multiassert(...tests)

The `multiassert` function accepts lazily evaluated asserts that throw exceptions.

### assert(condition, message?)

Alias for: [@testingrequired/lazy-assert](https://github.com/testingrequired/lazy-assert)
