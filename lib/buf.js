
const int = require('./int')

exports.read = function(readUint8Buffer, readLeft, readSize, writeUint8Buffer, writeLeft) {
  let i = 0
  let j = 0
  while (readSize) {
    let readUint8Offset = Math.floor(readLeft / 31)
    let readBitOffset = readLeft % 31
    let readRightBitSize = Math.min(31, readSize) - readBitOffset
    let uint8 = readUint8Buffer[readUint8Offset]
    let bits = int.read(uint8, readBitOffset, readRightBitSize)
    exports.load_lead(writeUint8Buffer, writeLeft, readRightBitSize, bits)
    writeLeft += readRightBitSize
    readLeft += readRightBitSize
    readSize -= readRightBitSize
    // if (j == 1) process.exit()
    j++
  }
}

exports.load = function(writeUint8Buffer, left, writeUint8) {
  let writeSize = int.size(writeUint8)
  let writeUpdated = writeUint8 << (31 - writeSize)
  let readUint8Left = Math.floor(left / 31)
  let readUint8a = writeUint8Buffer[readUint8Left]
  let readBitLeft = left % 31
  let readStartSize = 31 - readBitLeft
  let writeUint8Subseta = int.read(writeUpdated, 0, readStartSize)
  let outUint8a = int.load(readUint8a, readBitLeft, writeUint8Subseta)
  writeUint8Buffer[readUint8Left] = outUint8a
  let extent = readBitLeft + writeSize
  if (extent > 31) {
    let writeUint8SubsetbSize = extent - 31
    let writeUint8Subsetb = int.read(writeUpdated, readStartSize, writeUint8SubsetbSize)
    let readUint8b = writeUint8Buffer[readUint8Left + 1]
    let clearedUint8 = int.hide(readUint8b, 0, writeUint8SubsetbSize)
    let outUint8b = int.load_lead(clearedUint8, 0, writeUint8SubsetbSize, writeUint8Subsetb)
    writeUint8Buffer[readUint8Left + 1] = outUint8b
  }
}

exports.load_text = function(write8Buffer, left, string) {

}

exports.load_lead = function(writeUint8Buffer, left, size, writeUint8) {
  exports.hide(writeUint8Buffer, left, size - left)
  let writeSize = int.size(writeUint8)
  let newLeft = left + size - writeSize
  exports.load(writeUint8Buffer, newLeft, writeUint8)
}

exports.hide = function(writeUint8Buffer, left, size) {

}
