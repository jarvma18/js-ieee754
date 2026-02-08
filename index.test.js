const ieee754 = require('./index');

// Testing get decimal method
test('get half precision decimal from [25553] to be 1000.5', () => {
  expect(ieee754.getDecimal([25553], {mode: 'half'})).toBe(1000.5);
});
test('get single precision decimal from [17530, 8192] to be 1000.5', () => {
  expect(ieee754.getDecimal([17530, 8192], {mode: 'single'})).toBe(1000.5);
});
test('get double precision decimal from [16527, 17408, 0, 0] to be 1000.5', () => {
  expect(ieee754.getDecimal([16527, 17408, 0, 0], {mode: 'double'})).toBe(1000.5);
});
test('get half precision decimal from [99, 209] to be 1000.5', () => {
  expect(ieee754.getDecimal([99, 209], {mode: 'half'})).toBe(1000.5);
});
test('get single precision decimal from [68, 122, 32, 0] to be 1000.5', () => {
  expect(ieee754.getDecimal([68, 122, 32, 0], {mode: 'single'})).toBe(1000.5);
});
test('get double precision decimal from [64, 143, 68, 0, 0, 0, 0, 0] to be 1000.5', () => {
  expect(ieee754.getDecimal([64, 143, 68, 0, 0, 0, 0, 0], {mode: 'double'})).toBe(1000.5);
});
test('get half precision decimal from 0110001111010001 to be 1000.5', () => {
  expect(ieee754.getDecimal('0110001111010001', {mode: 'half'})).toBe(1000.5);
});
test('get single precision decimal from 01000100011110100010000000000000 to be 1000.5', () => {
  expect(ieee754.getDecimal('01000100011110100010000000000000', {mode: 'single'})).toBe(1000.5);
});
test('get double precision decimal from 0100000010001111010001000000000000000000000000000000000000000000 to be 1000.5', () => {
  expect(ieee754.getDecimal('0100000010001111010001000000000000000000000000000000000000000000', {mode: 'double'})).toBe(1000.5);
});

// Testing get precision method
test('get half precision from 1000.5 to be [25553]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([25553]);
});
test('get single precision from 1000.5 to be [17530, 8192]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([17530, 8192]);
});
test('get double precision from 1000.5 to be [16527, 17408, 0, 0]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([16527, 17408, 0, 0]);
});
test('get half precision from 1000.5 to be [99, 209]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([99, 209]);
});
test('get single precision from 1000.5 to be [68, 122, 32, 0]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([68, 122, 32, 0]);
});
test('get double precision from 1000.5 to be [64, 143, 68, 0, 0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([64, 143, 68, 0, 0, 0, 0, 0]);
});
test('get half precision from 1000.5 to be 0110001111010001', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'half'})).toBe('0110001111010001');
});
test('get single precision from 1000.5 to be 01000100011110100010000000000000', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'single'})).toBe('01000100011110100010000000000000');
});
test('get double precision from 1000.5 to be 0100000010001111010001000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(1000.5, {mode: 'double'})).toBe('0100000010001111010001000000000000000000000000000000000000000000');
});

// Testing get precision method with NaN
test('get half precision from NaN to be [32767]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([32767]);
});
test('get single precision from NaN to be [32767, 65535]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([32767, 65535]);
});
test('get double precision from NaN to be [32767, 65535, 65535, 65535]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([32767, 65535, 65535, 65535]);
});
test('get half precision from NaN to be [127, 255]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([127, 255]);
});
test('get single precision from NaN to be [127, 255, 255, 255]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([127, 255, 255, 255]);
});
test('get double precision from NaN to be [127, 255, 255, 255, 255, 255, 255, 255]', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([127, 255, 255, 255, 255, 255, 255, 255]);
});
test('get half precision from NaN to be 0111111111111111', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'half'})).toBe('0111111111111111');
});
test('get single precision from NaN to be 01111111111111111111111111111111', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'single'})).toBe('01111111111111111111111111111111');
});
test('get double precision from NaN to be 0111111111111111111111111111111111111111111111111111111111111111', () => {
  expect(ieee754.getPrecision(NaN, {mode: 'double'})).toBe('0111111111111111111111111111111111111111111111111111111111111111');
});

// Testing get precision method with +Infinity
test('get half precision from +Infinity to be [31744]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([31744]);
});
test('get single precision from +Infinity to be [32640, 0]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([32640, 0]);
});
test('get double precision from +Infinity to be [32752, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([32752, 0, 0, 0]);
});
test('get half precision from +Infinity to be [124, 0]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([124, 0]);
});
test('get single precision from +Infinity to be [127, 128, 0, 0]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([127, 128, 0, 0]);
});
test('get double precision from +Infinity to be [127, 240, 0, 0, 0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([127, 240, 0, 0, 0, 0, 0, 0]);
});
test('get half precision from +Infinity to be 0111110000000000', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'half'})).toBe('0111110000000000');
});
test('get single precision from +Infinity to be 01111111100000000000000000000000', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'single'})).toBe('01111111100000000000000000000000');
});
test('get double precision from +Infinity to be 0111111111110000000000000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(Infinity, {mode: 'double'})).toBe('0111111111110000000000000000000000000000000000000000000000000000');
});

// Testing get precision method with -Infinity
test('get half precision from -Infinity to be [64512]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([64512]);
});
test('get single precision from -Infinity to be [65408, 0]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([65408, 0]);
});
test('get double precision from -Infinity to be [65520, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([65520, 0, 0, 0]);
});
test('get half precision from -Infinity to be [252, 0]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([252, 0]);
});
test('get single precision from -Infinity to be [255, 128, 0, 0]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([255, 128, 0, 0]);
});
test('get double precision from -Infinity to be [255, 240, 0, 0, 0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([255, 240, 0, 0, 0, 0, 0, 0]);
});
test('get half precision from -Infinity to be 1111110000000000', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'half'})).toBe('1111110000000000');
});
test('get single precision from -Infinity to be 11111111100000000000000000000000', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'single'})).toBe('11111111100000000000000000000000');
});
test('get double precision from -Infinity to be 1111111111110000000000000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(-Infinity, {mode: 'double'})).toBe('1111111111110000000000000000000000000000000000000000000000000000');
});

// Testing get precision method with +0
test('get half precision from +0 to be [0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([0]);
});
test('get single precision from +0 to be [0, 0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([0, 0]);
});
test('get double precision from +0 to be [0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([0, 0, 0, 0]);
});
test('get half precision from +0 to be [0, 0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([0, 0]);
});
test('get single precision from +0 to be [0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([0, 0, 0, 0]);
});
test('get double precision from +0 to be [0, 0, 0, 0, 0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(0, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]);
});
test('get half precision from +0 to be 0000000000000000', () => {
  expect(ieee754.getPrecision(0, {mode: 'half'})).toBe('0000000000000000');
});
test('get single precision from +0 to be 00000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(0, {mode: 'single'})).toBe('00000000000000000000000000000000');
});
test('get double precision from +0 to be 0000000000000000000000000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(0, {mode: 'double'})).toBe('0000000000000000000000000000000000000000000000000000000000000000');
});

// Testing get precision method with -0
test('get half precision from -0 to be [32768]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'half', returnType: '16bitArray'})).toStrictEqual([32768]);
});
test('get single precision from -0 to be [32768, 0]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'single', returnType: '16bitArray'})).toStrictEqual([32768, 0]);
});
test('get double precision from -0 to be [32768, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'double', returnType: '16bitArray'})).toStrictEqual([32768, 0, 0, 0]);
});
test('get half precision from -0 to be [128, 0]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'half', returnType: '8bitArray'})).toStrictEqual([128, 0]);
});
test('get single precision from -0 to be [128, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'single', returnType: '8bitArray'})).toStrictEqual([128, 0, 0, 0]);
});
test('get double precision from -0 to be [128, 0, 0, 0, 0, 0, 0, 0]', () => {
  expect(ieee754.getPrecision(-0, {mode: 'double', returnType: '8bitArray'})).toStrictEqual([128, 0, 0, 0, 0, 0, 0, 0]);
});
test('get half precision from -0 to be 1000000000000000', () => {
  expect(ieee754.getPrecision(-0, {mode: 'half'})).toBe('1000000000000000');
});
test('get single precision from -0 to be 10000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(-0, {mode: 'single'})).toBe('10000000000000000000000000000000');
});
test('get double precision from -0 to be 1000000000000000000000000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(-0, {mode: 'double'})).toBe('1000000000000000000000000000000000000000000000000000000000000000');
});

// Testing to get precision for values under 1
// these might be wrong, 0.3 conversion might be wrong
test('get half precision from 0.1 to be 0010111001100111', () => {
  expect(ieee754.getPrecision(0.1, {mode: 'half'})).toBe('0010111001100111');
});
test('get half precision from 0.2 to be 0011001001100111', () => {
  expect(ieee754.getPrecision(0.2, {mode: 'half'})).toBe('0011001001100111');
});
test('get half precision decimal from 0011001001100111 to be 0.2000732421875', () => {
  expect(ieee754.getDecimal('0011001001100111', {mode: 'half'})).toBe(0.2000732421875);
});
test('get single precision from 0.1 to be 00111101110011001100110011001101', () => {
  expect(ieee754.getPrecision(0.1, {mode: 'single'})).toBe('00111101110011001100110011001101');
});
test('get single precision from 0.3 to be 00111110100110011001100110011001', () => {
  expect(ieee754.getPrecision(0.3, {mode: 'single'})).toBe('00111110100110011001100110011001');
});
test('get double precision from 0.1 to be 0011111110111001100110011001100110011001100110011001100110011010', () => {
  expect(ieee754.getPrecision(0.1, {mode: 'double'})).toBe('0011111110111001100110011001100110011001100110011001100110011010');
});
test('get double precision from 0.5 to be 0011111111100000000000000000000000000000000000000000000000000000', () => {
  expect(ieee754.getPrecision(0.5, {mode: 'double'})).toBe('0011111111100000000000000000000000000000000000000000000000000000');
});
test('get double precision from 0.9 to be 0011111111101100110011001100110011001100110011001100110011001101', () => {
  expect(ieee754.getPrecision(0.9, {mode: 'double'})).toBe('0011111111101100110011001100110011001100110011001100110011001101');
});
test('get double precision from 1.1 to be 0011111111110001100110011001100110011001100110011001100110011010', () => {
  expect(ieee754.getPrecision(1.1, {mode: 'double'})).toBe('0011111111110001100110011001100110011001100110011001100110011010');
});