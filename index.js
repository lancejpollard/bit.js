
exports.getNumberOfBitsInUint32 = function(uint32) {
  let count = 0
  while (uint32) {
    count++
    uint32 >>= 1
  }
  return count
}

exports.getPowerOfTwo = function(power) {
  return 1 << power
}

exports.getRangeOfBitsFromUint32 = function(uint32, left, size) {
  let extent = left + size
  if (extent > 31) {
    throw new Error(`Too much value`)
  }
  let total = 31
  let right = total - extent
  let powerOf2 = exports.getPowerOfTwo(total)
  let all1s = powerOf2 - 1
  let all1sOnRight = all1s >> left
  let all1sOnLeft = all1s << right
  let all1sInMiddle = all1sOnRight & all1sOnLeft
  let matching = uint32 & all1sInMiddle
  let shifted = matching >> right
  return shifted
}

exports.setBitsOnUint32 = function(uint32, left, value) {
  let sourceSize = 31
  let valueSize = exports.getNumberOfBitsInUint32(value)
  let extent = left + valueSize

  if (extent > sourceSize) {
    throw new Error(`Too many bits`)
  }

  let valueGrow = sourceSize - extent
  let valueUpdated = value << valueGrow
  let valuePowerOf2 = 1 << valueSize
  let valueAll1s = valuePowerOf2 - 1
  let valueAll1sShifted = valueAll1s << valueGrow
  let valueAll1sShiftedInverse = ~valueAll1sShifted
  let sourceUpdatedWithOpenSpot = valueAll1sShiftedInverse & uint32
  let combined = sourceUpdatedWithOpenSpot | valueUpdated
  return combined
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
  let writeSize = exports.getNumberOfBitsInUint32(writeUint32)
  let writeUpdated = writeUint32 << (31 - writeSize)
  let readUint32Left = left >> 5
  let readUint32a = writeUint32Buffer[readUint32Left]
  let readBitLeft = left
  let readStartSize = 31 - readBitLeft
  let writeUint32Subseta = exports.getRangeOfBitsFromUint32(writeUpdated, 0, readStartSize)
  let outUint32a = exports.setBitsOnUint32(readUint32a, readBitLeft, writeUint32Subseta)
  writeUint32Buffer[readUint32Left] = outUint32a
  let extent = readBitLeft + writeSize
  if (extent > 31) {
    let writeUint32Subsetb = exports.getRangeOfBitsFromUint32(writeUpdated, readStartSize, 31 - readStartSize)
    let writeUint32SubsetbSize = exports.getNumberOfBitsInUint32(writeUint32Subsetb)
    let readUint32b = writeUint32Buffer[readUint32Left + 1]
    let clearedUint32 = exports.clearBitsOnUint32(readUint32b, 0, writeUint32SubsetbSize)
    let outUint32b = exports.setBitsOnUint32(clearedUint32, 31 - writeUint32SubsetbSize, writeUint32Subsetb)
    writeUint32Buffer[readUint32Left + 1] = outUint32b
  }
}

exports.clearBitsOnUint32 = function(uint32, left, size) {
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
  let cleared = uint32 & all1sOnBounds
  return cleared
}

exports.setBitsUsingStringInUint8Buffer = function(write8Buffer, left, string) {

}

exports.getLastNBitsFromUint32 = function(int32, n) {
  // all 1s for n bits
  const mask = (1 << n) - 1
  // AND it to the integer so only matching bits remain.
  return int32 & mask
}
