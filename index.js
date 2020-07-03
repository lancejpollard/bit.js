
exports.getNumberOfBitsInUint32 = function(uint32) {
  let count = 0
  while (uint32) {
    count++
    uint32 >>= 1
  }
  return count
}

exports.getRangeOfBitsFromUint32 = function(uint32, left, size) {
  let total = exports.getNumberOfBitsInUint32(uint32)
  let right = total - left - size
  let powerOf2 = 1 << total
  let all1s = powerOf2 - 1
  let all1sOnRight = all1s >> left
  let all1sOnLeft = all1s << right
  let all1sInMiddle = all1sOnRight & all1sOnLeft
  let matching = uint32 & all1sInMiddle
  let shifted = matching >> right
  return shifted
}

exports.setBitsOnUint32 = function(uint32, left, value) {
  let sourceSize = exports.getNumberOfBitsInUint32(uint32)
  let valueSize = exports.getNumberOfBitsInUint32(value)

  // case 1: 101 + 101 at 3 = 101101
  // case 2: 101 + 101 at 2 = 10101
  // case 3: 101 + 1 at 1 = 111
  let targetExpanse = left + valueSize
  let targetSize = Math.max(sourceSize, targetExpanse)
  let sourceUpdated = uint32

  if (targetSize > sourceSize) {
    let targetGrow = targetSize - sourceSize
    // now we have the full length target
    sourceUpdated = sourceUpdated << targetGrow
  }

  // write value at a specific position relative to the target
  let valueGrow = targetSize - left - valueSize
  let valueUpdated = value << valueGrow
  let valueUpdatedSize = valueSize + valueGrow

  // clear the target at the value position
  let valuePowerOf2 = 1 << valueSize
  let valueAll1s = valuePowerOf2 - 1
  let valueAll1sShifted = valueAll1s << valueGrow
  let valueAll1sShiftedInverse = ~valueAll1sShifted
  let sourceUpdatedWithOpenSpot = valueAll1sShiftedInverse & sourceUpdated

  let output = sourceUpdatedWithOpenSpot | valueUpdated
  return output
}

exports.getRangeOfBitsFromUint32Buffer = function(read32Buffer, readLeft, readSize, writeUint32Buffer, writeLeft) {
  let i = 0
  let power2To5 = 1 << 5
  let power2To5All1s = power2To5 - 1
  while (i < readSize) {
    let readUint32Offset = readLeft >> 32
    let uint32 = read32Buffer[readUint32Offset]
    let readBitOffset = readLeft & power2To5All1s
    let readRightBitSize = 32 - readBitOffset
    let bits = exports.getRangeOfBitsFromUint32(uint32, readBitOffset, readRightBitSize)
    let total = exports.getNumberOfBitsInUint32(bits)
    exports.setBitsUsingUint32InUint32Buffer(writeUint32Buffer, writeLeft, bits)
    writeLeft += total
    readLeft += readRightBitSize
    i += readRightBitSize
  }
}

exports.setBitsUsingUint32InUint32Buffer = function(writeUint32Buffer, left, writeUint32) {
  let readUint32Left = left >> 5
  let readUint32 = writeUint32Buffer[readUint32Left]
  let readBitLeft = left
  let outUint32 = exports.setBitsOnUint32(readUint32, readBitLeft, writeUint32)
  writeUint32Buffer[readUint32Left] = outUint32
}

exports.setBitsUsingStringInUint8Buffer = function(write8Buffer, left, string) {

}

exports.getLastNBitsFromUint32 = function(int32, n) {
  // all 1s for n bits
  const mask = (1 << n) - 1
  // AND it to the integer so only matching bits remain.
  return int32 & mask
}
