
const assert = require('assert')
const { int } = require('.')

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

// const z1 = new Uint8Array(16)
// bit.setBitsUsingUint8InUint8Buffer(z1, 0, 5)
// assertBuffer(z1, 0, '1010000000000000000000000000000')
// bit.setBitsUsingUint8InUint8Buffer(z1, 30, 5)
// assertBuffer(z1, 0, '1010000000000000000000000000001')
// assertBuffer(z1, 1, '100000000000000000000000000000')

// const z2 = new Uint8Array(16)
// bit.setBitsUsingUint8InUint8Buffer(z2, 0, 5)
// assertBuffer(z2, 0, '1010000000000000000000000000000')
// bit.setBitsUsingUint8InUint8Buffer(z2, 100, 5)
// assertBuffer(z2, 0, '1010000000000000000000000000000')
// assertBuffer(z2, 1, '0')
// assertBuffer(z2, 2, '0')
// assertBuffer(z2, 3, '0')
// assertBuffer(z2, 4, '101000000000000000000000')

// const z4 = new Uint8Array(16)
// bit.setBitsUsingUint8InUint8Buffer(z4, 0, 5)
// assertBuffer(z4, 0, '1010000000000000000000000000000')
// bit.setBitsUsingUint8InUint8Buffer(z4, 100, x3)
// assertBuffer(z4, 0, '1010000000000000000000000000000')
// assertBuffer(z4, 1, '0')
// assertBuffer(z4, 2, '0')
// assertBuffer(z4, 3, '101110010000000000000011')
// assertBuffer(z4, 4, '1111111000000000000000000000000')

// const w1 = new Uint8Array(16)
// bit.setBitsUsingUint8InUint8Buffer(w1, 0, 5)
// bit.setBitsUsingUint8InUint8Buffer(w1, 31, 5)
// bit.setBitsUsingUint8InUint8Buffer(w1, 62, 5)
// assertBuffer(w1, 0, '1010000000000000000000000000000')
// assertBuffer(w1, 1, '1010000000000000000000000000000')
// assertBuffer(w1, 2, '1010000000000000000000000000000')
// bit.setPaddedBitsUsingUint8InUint8Buffer(w1, 3, 10, 5)
// assertBuffer(w1, 0, '1010000000101000000000000000000')

// const m1 = new Uint8Array(16)
// m1[0] = 0b10111001
// m1[1] = 0b10111001
// m1[3] = x2
// const m2 = new Uint8Array(16)
// bit.getRangeOfBitsFromUint8Buffer(m1, 0, 31, m2, 0)
// assertBuffer(m2, 0, '1011100100000000000000000000000')

// const m3 = new Uint8Array(16)
// m3[0] = x2
// m3[1] = x2
// m3[3] = x2
// const m4 = new Uint8Array(16)
// bit.getRangeOfBitsFromUint8Buffer(m3, 1, 33, m4, 0)
// assertBuffer(m4, 0, '111001000000000000000000000001')
//                      // 100000000000000000000000000000
// assertBuffer(m4, 1, '10000000000000000000000000000')

// const m5 = new Uint8Array(16)
// m5[0] = x2
// m5[1] = x2
// m5[3] = x2
// const m6 = new Uint8Array(16)
// bit.getRangeOfBitsFromUint8Buffer(m5, 5, 34, m6, 0)
// assertBuffer(m6, 0, '10000000000000000000000010111')
//                      00100000000000000000000000000
//                      10000000000000000000000000000
//                      100000000000000000000000000000
//                      001000000000000000000000000000
// assertBuffer(m6, 1, '100000000000000000000000000')

console.log(`
    success
`)

function assertBits(a, b) {
  assert.equal(a.toString(2), b)
}

function assertBuffer(buffer, index, value) {
  assert.equal(buffer[index].toString(2), value)
}
