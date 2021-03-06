
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

const d1 = int.load_lead(0b10111001, 2, 3, 2)
assertBits(d1, '10010001')


const e1 = new Uint8Array(16)
buf.load(e1, 0, 5)
assertBuffer(e1, 0, '10100000')
buf.load(e1, 6, 5)
assertBuffer(e1, 0, '10100010')
assertBuffer(e1, 1, '10000000')

const e2 = new Uint8Array(16)
buf.load(e2, 0, 5)
assertBuffer(e2, 0, '10100000')
buf.load(e2, 20, 5)
assertBuffer(e2, 0, '10100000')
assertBuffer(e2, 1, '0')
assertBuffer(e2, 2, '1010')
assertBuffer(e2, 3, '0')

const f1 = new Uint8Array(16)
f1[0] = 0b10111001
f1[1] = 0b10111001
f1[3] = 0b10111001
const f2 = new Uint8Array(16)
buf.read(f1, 0, 8, f2, 0)
assertBuffer(f2, 0, '10111001')

const f3 = new Uint8Array(16)
f3[0] = 0b10111001
f3[1] = 0b10111001
f3[3] = 0b10111001
const f4 = new Uint8Array(16)
buf.read(f3, 1, 8, f4, 0)
assertBuffer(f4, 0, '1110011')
assertBuffer(f4, 1, '0')

const f5 = new Uint8Array(16)
f5[0] = 0b10111001
f5[1] = 0b10111001
f5[3] = 0b10111001
const f6 = new Uint8Array(16)
buf.read(f5, 1, 16, f6, 0)
assertBuffer(f6, 0, '1110011')
assertBuffer(f6, 1, '1110010')
```
