const ieee754 = require('./index');

describe('getDecimal', () => {
  const roundTripCases = [
    // 1000.5 in various modes/formats
    ['half', [25553], 1000.5],
    ['single', [17530, 8192], 1000.5],
    ['double', [16527, 17408, 0, 0], 1000.5],
    ['half', [99, 209], 1000.5],
    ['single', [68, 122, 32, 0], 1000.5],
    ['double', [64, 143, 68, 0, 0, 0, 0, 0], 1000.5],
    ['half', '0110001111010001', 1000.5],
    ['single', '01000100011110100010000000000000', 1000.5],
    [
      'double',
      '0100000010001111010001000000000000000000000000000000000000000000',
      1000.5,
    ],
  ];

  test.each(roundTripCases)(
    'Should return %p when mode is %s and input is %p',
    (mode, input, expected) => {
      expect(ieee754.getDecimal(input, {mode})).toBe(expected);
    }
  );
});
