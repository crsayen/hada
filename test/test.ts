import {
  chunkHexBytes,
  bytesToInt,
  hexToBytes,
  bytesToHex,
  intToHex,
  intToBytes,
  asciiBytesToString,
  asciiHexToString,
  stringToAsciiHex,
} from '../src/index'
import * as assert from 'assert'

describe('chunkHexBytes', () => {
  it('should separate a string into strings of length 2', () => {
    // [hex string, expected]
    const tests = [
      ['deadbeef', ['de', 'ad', 'be', 'ef']],
      ['deadb', ['de', 'ad', 'b']],
    ]
    tests.forEach(([hex, expected]) => {
      // @ts-ignore
      assert.deepStrictEqual(chunkHexBytes(hex), expected)
    })
  })
})
describe('bytesToInt', () => {
  it('should convert an array of numbers to a single number', () => {
    const tests = [
      [[0xff, 0xff], 65535],
      [[0x12, 0x34], 4660],
      [[0x10, 0x00], 4096],
      [[0xa0, 0x50, 0xff], 10506495],
    ]
    tests.forEach(([bytes, expected]) => {
      // @ts-ignore
      assert.strictEqual(bytesToInt(bytes), expected)
    })
  })
})
describe('hexTobytes', () => {
  it('should convert a hex string to an array of numbers', () => {
    const tests = [
      ['deadbeef', [0xde, 0xad, 0xbe, 0xef]],
      ['DEADBEEF', [0xde, 0xad, 0xbe, 0xef]],
      ['0123456789abcdef', [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]],
    ]
    tests.forEach(([hex, expected]) => {
      // @ts-ignore
      assert.deepStrictEqual(hexToBytes(hex), expected)
    })
  })
})
describe('bytesToHex', () => {
  it('should convert a number array to a properly padded hex string', () => {
    const tests = [
      [[0xde, 0xad, 0xbe, 0xef], 'deadbeef'],
      [[0x00, 0x00, 0xbe, 0xef], '0000beef'],
      [[0x09, 0x02, 0x01], '090201'],
      [[0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef], '0123456789abcdef'],
    ]
    tests.forEach(([hex, expected]) => {
      // @ts-ignore
      assert.strictEqual(bytesToHex(hex), expected)
    })
  })
})
describe('intToHex', () => {
  it('should convert a number to a properly padded hex string', () => {
    // [number, hexlength, padwith, expected]
    const tests = [
      [1, 8, 'f', 'fffffff1'],
      [0x1f, 8, 'f', 'ffffff1f'],
      [0x00ff00, 6, '0', '00ff00'],
      [0x01ff00, 6, '0', '01ff00'],
      [0x1234, null, null, '1234'],
    ]
    tests.forEach(([num, len, pad, expected]) => {
      // @ts-ignore
      assert.strictEqual(intToHex(num, len, pad), expected)
    })
  })
})
describe('intToBytes', () => {
  it('should convert a number to a properly padded number array', () => {
    // [number, hexlength, padwith, expected]
    const tests = [
      [1, 8, 'f', [0xff, 0xff, 0xff, 0xf1]],
      [0x1f, 8, 'f', [0xff, 0xff, 0xff, 0x1f]],
      [0x00ff00, 6, '0', [0x00, 0xff, 0x00]],
      [0x01ff00, 6, '0', [0x01, 0xff, 0x00]],
      [0x1234, null, null, [0x12, 0x34]],
    ]
    tests.forEach(([num, len, pad, expected]) => {
      // @ts-ignore
      assert.deepStrictEqual(intToBytes(num, len, pad), expected)
    })
  })
})
describe('asciiBytesToString', () => {
  it('should convert an ascii byte array to a string', () => {
    // [asciibytes, expected]
    const tests = [
      [[0x31, 0x31, 0x31], '111'],
      [[0x49, 0x49, 0x49], 'III'],
      [[0xb5, 0xac, 0xcc], 'µ¬Ì'],
    ]
    tests.forEach(([hex, expected]) => {
      // @ts-ignore
      assert.strictEqual(asciiBytesToString(hex), expected)
    })
  })
})
describe('asciiHexToString', () => {
  it('should convert an ascii hex string to a string', () => {
    // [asciihex, expected]
    const tests = [
      ['313131', '111'],
      ['494949', 'III'],
      ['b5accc', 'µ¬Ì'],
    ]
    tests.forEach(([hex, expected]) => {
      // @ts-ignore
      assert.strictEqual(asciiHexToString(hex), expected)
    })
  })
})
describe('stringToAsciiHex', () => {
  it('should convert a string to ascii hex', () => {
    // [asciihex, expected]
    const tests = [
      ['313131', '111'],
      ['494949', 'III'],
      ['b5accc', 'µ¬Ì'],
    ]
    tests.forEach(([expected, str]) => {
      // @ts-ignore
      assert.strictEqual(stringToAsciiHex(str), expected)
    })
  })
})
