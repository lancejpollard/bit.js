
const assert = require('assert')
const bit = require('.')

const x5 = 0b101
const x17 = 0b10001
const x23 = 0b10111
const x185 = 0b10111001

// const a1 = bit.getRangeOfBitsFromUint32(x5, 0, 3)
// assertBits(a1, '101')

// const a2 = bit.getRangeOfBitsFromUint32(x185, 2, 4)
// assertBits(a2, '1110')

// const a3 = bit.getRangeOfBitsFromUint32(x185, 0, 6)
// assertBits(a3, '101110')

// const a4 = bit.getRangeOfBitsFromUint32(x185, 1, 5)
// assertBits(a4, '1110')

const b1 = bit.setBitsOnUint32(x185, 1, 1)
assertBits(b1, '11111001')

const b2 = bit.setBitsOnUint32(x185, 1, 2)
assertBits(b2, '11011001')

const b3 = bit.setBitsOnUint32(x185, 8, x5)
assertBits(b3, '10111001101')

// const z1 = new Uint8Array(16)
// z1[0] = x185
// z1[1] = x185
// z1[3] = x185
// const z2 = new Uint8Array(16)
// bit.getRangeOfBitsFromUint32Buffer(z1, 4, 4, z2, 0)
// assertBuffer(z2, 0, '1001')

// const z1 = new Uint32Array(16)
// bit.setBitsUsingUint32InUint32Buffer(z1, 0, 5)
// assertBuffer(z1, 0, '101')
// bit.setBitsUsingUint32InUint32Buffer(z1, 2, 5)
// assertBuffer(z1, 0, '10101')
// bit.setBitsUsingUint32InUint32Buffer(z1, 5, 5)
// assertBuffer(z1, 0, '10110101')

console.log(`
    success
`)

function assertBits(a, b) {
  assert.equal(a.toString(2), b)
}

function assertBuffer(buffer, index, value) {
  assert.equal(buffer[index].toString(2), value)
}
