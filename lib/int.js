
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
  let p = exports.rise(8)
  let o = p - 1
  let ol = o << r
  let or = o >> l
  let om = or & ol
  let x = n & om
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

exports.hide = function(n, i, c) {
  let s = i + c
  let r = 8 - s
  let p = 1 << 8
  let o = p - 1
  let j = o >> i
  let k = o << r
  let h = j & k
  let g = ~h
  let z = n & g
  return z
}

exports.load_lead = function(uint8, left, size, value) {
  uint8 = exports.hide(uint8, left, size)
  let writeSize = exports.size(value)
  let newLeft = left + size - writeSize
  return exports.load(uint8, newLeft, value)
}

function log(name, val, msg) {
  console.log(name, exports.show(val), exports.show(val).length, msg || '')
}
