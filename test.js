
const assert = require('assert')
const bit = require('.')

const x5 = 0b101
const x17 = 0b10001
const x23 = 0b10111
const x185 = 0b10111001

const a1 = bit.getRangeOfBitsFromInteger(x5, 0, 3)
assertBits(a1, '101')

const a2 = bit.getRangeOfBitsFromInteger(x185, 2, 4)
assertBits(a2, '1110')

const a3 = bit.getRangeOfBitsFromInteger(x185, 0, 6)
assertBits(a3, '101110')

const a4 = bit.getRangeOfBitsFromInteger(x185, 1, 5)
assertBits(a4, '1110')

const b1 = bit.setBitsOnInteger(x185, 1, 1)
assertBits(b1, '11111001')

const b2 = bit.setBitsOnInteger(x185, 1, 2)
assertBits(b2, '11011001')

// const a3 = bit.getRangeOfBitsFromInteger(5, 1, 2)
// assertBits(a3, '1')

// const a4 = bit.getRangeOfBitsFromInteger(x185, 3, 3)
// assertBits(a4, '111')

// const a5 = bit.getRangeOfBitsFromInteger(x185, 2, 4)
// assertBits(a5, '1110')

// const a5 = bit.setBitsInInteger(x185, 3, 3)
// assertBits(a5, '1110')

console.log(`
    success
`)

function assertBits(a, b) {
  assert.equal(a.toString(2), b)
}
