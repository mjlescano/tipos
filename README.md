# tipos

Wrap a function and validate the arguments it takes and the return value each time is called.

This is an experemient to try to mimic some functionality of statically typed languages (e.g. TypeScript), but the Javascript way. So I try to avoid any overhead, like adding a transpilation step, more sintactical sugar, etc.

## Getting started

Install it with npm:

```bash
npm i -S tipos
```

### Usage

Just wrap a function, and the next time you call it, it will validate the parameters taken and the value it returns.

```javascript
const tipos = require('tipos')

const sumTypes = tipos(Number, Number).returns(Number)

const sum = sumTypes((a, b) => a + b)

// now, you can safely call it:

const result = sum(1, 3) // 4

// if you call it in a way that is not intended, it will throw an InvalidArgumentValueError error

try {
  const result = sum('some-string', 3)
} catch(err) {
  // InvalidArgumentValueError
}
```

## TODOs
- [ ] Add API docs
- [ ] Transpilate with Babel
- [ ] Add optional parameters
- [ ] Add enum/anyOf parameters
- [ ] Add typed array parameter
- [ ] Add objects with shape validation
