export function chunkHexBytes(str: string) {
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

export function bytesToInt(bytes: number[]): number {
  if (bytes.length === 0) throw Error('bytes must not be empty')
  return parseInt(bytes.map((n) => intToHex(n, 2)).join(''), 16)
}

export function hexToBytes(hex: string): number[] {
  hex = padStart(hex, hex.length + (hex.length % 2), '0')
  return chunkHexBytes(hex).map((chars) => parseInt(chars, 16))
}

export function bytesToHex(bytes: number[]) {
  if (bytes.length === 0) return ''
  return padStart(
    bytes.map((b) => intToHex(b, 2)).join(''),
    bytes.length * 2,
    '0'
  )
}

export function intToHex(
  n: number,
  length: number = 0,
  padwith: string = '0'
): string {
  length = length == null ? 0 : length
  padwith = padwith == null ? '0' : padwith
  return padStart(n.toString(16), length, padwith)
}

export function intToBytes(
  n: number,
  length: number = 0,
  padwith: number = 0
): number[] {
  length = length == null ? 0 : length
  padwith = padwith == null ? 0 : padwith
  let hex = intToHex(n)
  hex = padStart(hex, hex.length + (hex.length % 2), '0')
  const bytes = hexToBytes(hex)
  const fillLength = length - bytes.length
  if (fillLength < 1) return bytes
  return [...Array(fillLength).fill(padwith), ...bytes]
}

export function asciiHexToString(hex: string): string {
  return hexToBytes(hex)
    .map((c) => String.fromCharCode(c))
    .join('')
}

export function asciiBytesToString(bytes: number[]): string {
  if (bytes.length === 0) throw Error('bytes must not be empty')
  return bytes.map((c) => String.fromCharCode(c)).join('')
}

export function stringToAsciiHex(s: string): string {
  return s
    .split('')
    .map((c) => c.charCodeAt(0).toString(16))
    .join('')
}

export function stringToAsciiBytes(s: string): number[] {
  return hexToBytes(stringToAsciiHex(s))
}
