
exports.getNumberOfBitsInInteger = function(int32) {
  if (int32 === 0) return 1
  return Math.floor(Math.log2(int32)) + 1
}

exports.getRangeOfBitsFromInteger = function(int32, start, size) {
  let total = exports.getNumberOfBitsInInteger(int32)
  let end = total - start - size
  let powerOf2 = 1 << total
  let all1s = powerOf2 - 1
  let all1sOnRight = all1s >> start
  let all1sOnLeft = all1s << end
  let all1sInMiddle = all1sOnRight & all1sOnLeft
  let matching = int32 & all1sInMiddle
  let shifted = matching >> end
  return shifted
}

exports.setBitsInInteger = function(int32, start, value) {
  let selection = value << start
  let combined = int32 | selection
  return combined
}

exports.getRangeOfBitsFromBuffer = function(buffer, start, size) {
  const sizeDividedBy8 = size >> 3
  let resultByteBuffer = new Uint8Array(sizeDividedBy8)
}

exports.getLastNBitsFromInteger = function(int32, n) {
  // all 1s for n bits
  const mask = (1 << n) - 1
  // AND it to the integer so only matching bits remain.
  return int32 & mask
}
