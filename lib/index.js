"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToAsciiBytes = exports.stringToAsciiHex = exports.asciiBytesToString = exports.asciiHexToString = exports.intToBytes = exports.intToHex = exports.bytesToHex = exports.hexToBytes = exports.bytesToInt = exports.chunkHexBytes = void 0;
function chunkHexBytes(str) {
    var length = str.length;
    var index = 0;
    var resIndex = 0;
    var result = new Array(Math.ceil(length / 2));
    while (index < length) {
        result[resIndex++] = str.slice(index, (index += 2));
    }
    return result;
}
exports.chunkHexBytes = chunkHexBytes;
function padStart(str, length, pad) {
    while (str.length < length) {
        str = pad + str;
    }
    return str;
}
function bytesToInt(bytes) {
    if (bytes.length === 0)
        throw Error('bytes must not be empty');
    return parseInt(bytes.map(function (n) { return intToHex(n, 2); }).join(''), 16);
}
exports.bytesToInt = bytesToInt;
function hexToBytes(hex) {
    return chunkHexBytes(hex).map(function (chars) { return parseInt(chars, 16); });
}
exports.hexToBytes = hexToBytes;
function bytesToHex(bytes) {
    if (bytes.length === 0)
        return '';
    return padStart(bytes.map(function (b) { return intToHex(b, 2); }).join(''), bytes.length * 2, '0');
}
exports.bytesToHex = bytesToHex;
function intToHex(n, length, padwith) {
    if (length === void 0) { length = 0; }
    if (padwith === void 0) { padwith = '0'; }
    length = length == null ? 0 : length;
    padwith = padwith == null ? '0' : padwith;
    return padStart(n.toString(16), length, padwith);
}
exports.intToHex = intToHex;
function intToBytes(n, length, padwith) {
    if (length === void 0) { length = 0; }
    if (padwith === void 0) { padwith = 0; }
    length = length == null ? 0 : length;
    padwith = padwith == null ? 0 : padwith;
    var hex = intToHex(n, length, padwith.toString(16));
    return hexToBytes(hex);
}
exports.intToBytes = intToBytes;
function asciiHexToString(hex) {
    return hexToBytes(hex)
        .map(function (c) { return String.fromCharCode(c); })
        .join('');
}
exports.asciiHexToString = asciiHexToString;
function asciiBytesToString(bytes) {
    if (bytes.length === 0)
        throw Error('bytes must not be empty');
    return bytes.map(function (c) { return String.fromCharCode(c); }).join('');
}
exports.asciiBytesToString = asciiBytesToString;
function stringToAsciiHex(s) {
    return s
        .split('')
        .map(function (c) { return c.charCodeAt(0).toString(16); })
        .join('');
}
exports.stringToAsciiHex = stringToAsciiHex;
function stringToAsciiBytes(s) {
    return hexToBytes(stringToAsciiHex(s));
}
exports.stringToAsciiBytes = stringToAsciiBytes;
