
const int = require('./int')

exports.read_head = function(readUint8Buffer, readLeft, readSize) {
  let uint8 = 0
  read(readUint8Buffer, readLeft, readSize, 0, function(l, s, b){
    uint8 = int.load_lead(uint8, l, s, b)
  })
  return uint8
}

exports.read = function(readUint8Buffer, readLeft, readSize, writeUint8Buffer, writeLeft) {
  read(readUint8Buffer, readLeft, readSize, writeLeft, function(l, s, b){
    exports.load_lead(writeUint8Buffer, l, s, b)
  })
}

exports.load = function(writeUint8Buffer, left, writeUint8) {
  let writeSize = int.size(writeUint8)
  let writeUpdated = writeUint8 << (8 - writeSize)
  let readUint8Left = left >> 3
  let readUint8a = writeUint8Buffer[readUint8Left]
  let readBitLeft = left % 8
  let readStartSize = 8 - readBitLeft
  let writeUint8Subseta = int.read(writeUpdated, 0, readStartSize)
  let outUint8a = int.load(readUint8a, readBitLeft, writeUint8Subseta)
  writeUint8Buffer[readUint8Left] = outUint8a
  let extent = readBitLeft + writeSize
  if (extent > 8) {
    let writeUint8SubsetbSize = extent - 8
    let writeUint8Subsetb = int.read(writeUpdated, readStartSize, writeUint8SubsetbSize)
    let readUint8b = writeUint8Buffer[readUint8Left + 1]
    let clearedUint8 = int.hide(readUint8b, 0, writeUint8SubsetbSize)
    let outUint8b = int.load_lead(clearedUint8, 0, writeUint8SubsetbSize, writeUint8Subsetb)
    writeUint8Buffer[readUint8Left + 1] = outUint8b
  }
}

exports.load_lead = function(writeUint8Buffer, left, size, writeUint8) {
  exports.hide(writeUint8Buffer, left, size - left)
  let writeSize = int.size(writeUint8)
  let newLeft = left + size - writeSize
  exports.load(writeUint8Buffer, newLeft, writeUint8)
}

exports.hide = function(writeUint8Buffer, left, size) {

}

function read(readUint8Buffer, readLeft, readSize, writeLeft, cb) {
  let i = 0
  while (readSize) {
    let readUint8Offset = readLeft >> 3
    let readBitOffset = readLeft % 8
    let readRightBitSize = Math.min(8, readSize + readBitOffset) - readBitOffset
    let uint8 = readUint8Buffer[readUint8Offset]
    let bits = int.read(uint8, readBitOffset, readRightBitSize)
    cb(writeLeft, readRightBitSize, bits)
    writeLeft += readRightBitSize
    readLeft += readRightBitSize
    readSize -= readRightBitSize
  }
}
