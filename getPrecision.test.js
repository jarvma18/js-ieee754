const ieee754 = require('./index');

describe('getPrecision', () => {
  const basicCases = [
    ['half', '16bitArray', 1000.5, [25553]],
    ['single', '16bitArray', 1000.5, [17530, 8192]],
    ['double', '16bitArray', 1000.5, [16527, 17408, 0, 0]],
    ['half', '8bitArray', 1000.5, [99, 209]],
    ['single', '8bitArray', 1000.5, [68, 122, 32, 0]],
    ['double', '8bitArray', 1000.5, [64, 143, 68, 0, 0, 0, 0, 0]],
    ['half', undefined, 1000.5, '0110001111010001'],
    ['single', undefined, 1000.5, '01000100011110100010000000000000'],
    [
      'double',
      undefined,
      1000.5,
      '0100000010001111010001000000000000000000000000000000000000000000',
    ],
  ];

  test.each(basicCases)(
    'Should return %p for input %p when mode is %s and returnType is %s',
    (mode, returnType, input, expected) => {
      const opts = {mode};
      if (returnType) opts.returnType = returnType;
      expect(ieee754.getPrecision(input, opts)).toStrictEqual(expected);
    }
  );
});

describe('getPrecision special values', () => {
  const specials = [
    // NaN
    ['NaN', NaN, [
      ['half', '16bitArray', [32767]],
      ['single', '16bitArray', [32767, 65535]],
      ['double', '16bitArray', [32767, 65535, 65535, 65535]],
      ['half', '8bitArray', [127, 255]],
      ['single', '8bitArray', [127, 255, 255, 255]],
      ['double', '8bitArray', [127, 255, 255, 255, 255, 255, 255, 255]],
      ['half', undefined, '0111111111111111'],
      ['single', undefined, '01111111111111111111111111111111'],
      ['double', undefined, '0111111111111111111111111111111111111111111111111111111111111111'],
    ]],
    ['+Infinity', Infinity, [
      ['half', '16bitArray', [31744]],
      ['single', '16bitArray', [32640, 0]],
      ['double', '16bitArray', [32752, 0, 0, 0]],
      ['half', '8bitArray', [124, 0]],
      ['single', '8bitArray', [127, 128, 0, 0]],
      ['double', '8bitArray', [127, 240, 0, 0, 0, 0, 0, 0]],
      ['half', undefined, '0111110000000000'],
      ['single', undefined, '01111111100000000000000000000000'],
      ['double', undefined, '0111111111110000000000000000000000000000000000000000000000000000'],
    ]],
    ['-Infinity', -Infinity, [
      ['half', '16bitArray', [64512]],
      ['single', '16bitArray', [65408, 0]],
      ['double', '16bitArray', [65520, 0, 0, 0]],
      ['half', '8bitArray', [252, 0]],
      ['single', '8bitArray', [255, 128, 0, 0]],
      ['double', '8bitArray', [255, 240, 0, 0, 0, 0, 0, 0]],
      ['half', undefined, '1111110000000000'],
      ['single', undefined, '11111111100000000000000000000000'],
      ['double', undefined, '1111111111110000000000000000000000000000000000000000000000000000'],
    ]],
    ['+0', 0, [
      ['half', '16bitArray', [0]],
      ['single', '16bitArray', [0, 0]],
      ['double', '16bitArray', [0, 0, 0, 0]],
      ['half', '8bitArray', [0, 0]],
      ['single', '8bitArray', [0, 0, 0, 0]],
      ['double', '8bitArray', [0, 0, 0, 0, 0, 0, 0, 0]],
      ['half', undefined, '0000000000000000'],
      ['single', undefined, '00000000000000000000000000000000'],
      ['double', undefined, '0000000000000000000000000000000000000000000000000000000000000000'],
    ]],
    ['-0', -0, [
      ['half', '16bitArray', [32768]],
      ['single', '16bitArray', [32768, 0]],
      ['double', '16bitArray', [32768, 0, 0, 0]],
      ['half', '8bitArray', [128, 0]],
      ['single', '8bitArray', [128, 0, 0, 0]],
      ['double', '8bitArray', [128, 0, 0, 0, 0, 0, 0, 0]],
      ['half', undefined, '1000000000000000'],
      ['single', undefined, '10000000000000000000000000000000'],
      ['double', undefined, '1000000000000000000000000000000000000000000000000000000000000000'],
    ]],
  ];

  specials.forEach(([name, val, cases]) => {
    describe(name, () => {
      test.each(cases)(
        'Should return %p when mode is %s and returnType is %s',
        (mode, returnType, expected) => {
          const opts = {mode};
          if (returnType) opts.returnType = returnType;
          expect(ieee754.getPrecision(val, opts)).toStrictEqual(expected);
        }
      );
    });
  });
});
