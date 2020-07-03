
const assert = require('assert')
const bit = require('.')

// 31 length === 1000000000000000000000000000000

const x1 = 0b1010000000000000000000000000000
const x2 = 0b1011100100000000000000000000000

const a1 = bit.getRangeOfBitsFromUint32(x1, 0, 3)
assertBits(a1, '101')

const a2 = bit.getRangeOfBitsFromUint32(x2, 2, 4)
assertBits(a2, '1110')

const a3 = bit.getRangeOfBitsFromUint32(x2, 0, 6)
assertBits(a3, '101110')

const a4 = bit.getRangeOfBitsFromUint32(x2, 1, 5)
assertBits(a4, '1110')

const b0 = bit.setBitsOnUint32(0, 1, 1)
assertBits(b0, '100000000000000000000000000000')

const b1 = bit.setBitsOnUint32(x2, 1, 1)
assertBits(b1, '1111100100000000000000000000000')

const b2 = bit.setBitsOnUint32(x2, 1, 2)
assertBits(b2, '1101100100000000000000000000000')

const b3 = bit.setBitsOnUint32(x2, 8, 5)
assertBits(b3, '1011100110100000000000000000000')

const z1 = new Uint32Array(16)
bit.setBitsUsingUint32InUint32Buffer(z1, 0, 5)
assertBuffer(z1, 0, '1010000000000000000000000000000')
bit.setBitsUsingUint32InUint32Buffer(z1, 30, 5)
assertBuffer(z1, 0, '1010000000000000000000000000001')
assertBuffer(z1, 1, '10000000000000000000000000000')

// const z2 = new Uint32Array(16)
// z2[0] = x2
// z2[1] = x2
// z2[3] = x2
// const z3 = new Uint32Array(16)
// bit.getRangeOfBitsFromUint32Buffer(z2, 4, 4, z3, 0)
// assertBuffer(z3, 0, '1001')

console.log(`
    success
`)

function assertBits(a, b) {
  assert.equal(a.toString(2), b)
}

function assertBuffer(buffer, index, value) {
  assert.equal(buffer[index].toString(2), value)
}
