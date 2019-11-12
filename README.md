# js-ieee754

Javascript library to convert ieee-754 values to decimal format and vice versa. Library is working, but it needs several tasks to be compeleted:
  - Code refactoring/optimizing
  - More converting options
  - Testing of conversion (with half, single and double precision)
  - Testing the options
  - Error handling for
    - Value overflow
    - Value underflow

## Usage

  - Require index.js file:
    - let jsieee754 = require(filepath)
  - Convert ieee-754 format to decimal:
    - jsieee754.getDecimal(value, options)
      - value: value in binary string: '00000000010000000000000000000000' or array: [65284, 16774] (16bit) [255, 4, 65, 134] (8bit)
      - options.mode: 'half'/'single'/'double' (what precision to use)
  - Convert decimal to ieee-754:
    - jsieee754.getPrecision(value, options)
      - value: number, NaN, -Infinite/Infinite, +-0
      - options.mode: 'half'/'single'/'double' (what precision to use),
      - options.returnType: '16bitArray'/'8bitArray' (return the precision value as array and not in binary string)
