
exports.show = function(dec) {
  return (dec >>> 0).toString(2).padStart(8, '0')
}

exports.size = function(n) {
  let i = 0
  while (n) {
    i++
    n >>= 1
  }
  return i
}

exports.rise = function(p) {
  return 1 << p
}

exports.read = function(n, l, s) {
  let r = 8 - l - s
  let t8 = exports.rise(8)
  let o8 = t8 - 1
  let o8l = o8 << r
  let o8r = o8 >> l
  let o8m = o8r & o8l
  let x = n & o8m
  return x >> r
}

exports.load = function(n, i, x) {
  let o = 0xff // 0b11111111
  let c = exports.size(x)
  let j = 8 - i // right side start
  let k = j - c // right side remaining
  let h = c + i
  let a = x << k // set bits
  let b = a ^ o // set bits flip
  let d = o >> h // mask right
  let q = d ^ b //
  let m = o >> j // mask left
  let s = m << j
  let t = s ^ q // clear bits!
  let w = n | a // set the set bits
  let z = w & ~t // perform some magic https://stackoverflow.com/q/8965521/169992
  return z
}

exports.hide = function(uint8, left, size) {
  let extent = left + size
  if (extent > 31) {
    throw new Error(`Too much value`)
  }
  let total = 31
  let right = total - extent
  let powerOf2 = 1 << total
  let all1s = powerOf2 - 1
  let all1sOnRight = all1s >> left
  let all1sOnLeft = all1s << right
  let all1sInMiddle = all1sOnRight & all1sOnLeft
  let all1sOnBounds = ~all1sInMiddle
  let cleared = uint8 & all1sOnBounds
  return cleared
}

exports.link_lead = function(uint8, left, size, value) {
  uint8 = exports.clearBitsOnUint8(uint8, left, size)
  let writeSize = exports.getNumberOfBitsInUint8(value)
  let newLeft = left + size - writeSize
  return exports.setBitsOnUint8(uint8, newLeft, value)
}

function log(name, val, msg) {
  console.log(name, exports.dec2bin(val), exports.dec2bin(val).length, msg || '')
}
