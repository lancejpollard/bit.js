
## Installation

```
npm install @lancejpollard/bit
```

```js
const assert = require('assert')
const { int } = require('@lancejpollard/bit')

const a1 = int.read(0b10100000, 0, 1)
assertBits(a1, '1')

const a2 = int.read(0b10100000, 0, 2)
assertBits(a2, '10')

const a3 = int.read(0b10100000, 0, 3)
assertBits(a3, '101')

const a4 = int.read(0b10111001, 2, 4)
assertBits(a4, '1110')

const a5 = int.read(0b10111001, 0, 6)
assertBits(a5, '101110')

const b0 = int.load(0, 1, 1)
assertBits(b0, '1000000')

const b1 = int.load(0b10111001, 1, 0b10)
assertBits(b1, '11011001')

const b2 = int.load(0b10111001, 1, 0b1001)
assertBits(b2, '11001001')

const b3 = int.load(0b10111001, 3, 0b1001)
assertBits(b3, '10110011')

const b4 = int.load(0b10111001, 4, 0b1001)
assertBits(b4, '10111001')

const b5 = int.load(0b10111001, 5, 0b101)
assertBits(b5, '10111101')

const c1 = int.hide(0b10111001, 2, 3)
assertBits(c1, '10000001')

const c2 = int.hide(0b10111001, 0, 3)
assertBits(c2, '11001')

const d1 = int.link_lead(0b10111001, 2, 3, 2)
assertBits(d1, '10010001')
```
