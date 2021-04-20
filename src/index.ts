function chunkHexBytes(str: string) {
  const length = str.length
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / 2))

  while (index < length) {
    result[resIndex++] = str.slice(index, (index += 2))
  }
  return result
}

function padStart(str: string, length: number, pad: string): string {
  while (str.length < length) {
    str = pad + str
  }
  return str
}

function bytesToInt(bytes: number[]): number {
  if (bytes.length === 0) throw Error('bytes must not be empty')
  return parseInt(bytes.map((n) => intToHex(n, 2)).join(''), 16)
}

function hexToBytes(hex: string): number[] {
  return chunkHexBytes(hex).map((chars) => parseInt(chars, 16))
}

function bytesToHex(bytes: number[]) {
  if (bytes.length === 0) return ''
  return padStart(
    bytes.map((b) => intToHex(b, 2)).join(''),
    bytes.length * 2,
    '0'
  )
}

function intToHex(
  n: number,
  length: number = 0,
  padwith: string = '0'
): string {
  length = length == null ? 0 : length
  padwith = padwith == null ? '0' : padwith
  return padStart(n.toString(16), length, padwith)
}

function intToBytes(
  n: number,
  length: number = 0,
  padwith: number = 0
): number[] {
  length = length == null ? 0 : length
  padwith = padwith == null ? 0 : padwith
  const hex = intToHex(n, length, padwith.toString(16))
  return hexToBytes(hex)
}

function asciiHexToString(hex: string): string {
  return hexToBytes(hex)
    .map((c) => String.fromCharCode(c))
    .join('')
}

function asciiBytesToString(bytes: number[]): string {
  if (bytes.length === 0) throw Error('bytes must not be empty')
  return bytes.map((c) => String.fromCharCode(c)).join('')
}

function stringToAsciiHex(s: string): string {
  return s
    .split('')
    .map((c) => c.charCodeAt(0).toString(16))
    .join('')
}

function stringToAsciiBytes(s: string): number[] {
  return hexToBytes(stringToAsciiHex(s))
}

export default {
  chunkHexBytes,
  padStart,
  bytesToInt,
  hexToBytes,
  bytesToHex,
  intToHex,
  intToBytes,
  asciiHexToString,
  asciiBytesToString,
  stringToAsciiHex,
  stringToAsciiBytes,
}
