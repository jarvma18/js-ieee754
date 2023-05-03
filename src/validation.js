'use strict'

function checkValueForDecimalConversion(value) {
  if (!value) {
    throw new Error('Value must be defined');
  }
  if (!value.length) {
    throw new Error('Value must have length');
  }
  if (typeof value !== 'object' && typeof value !== 'string') {
    throw new Error('Value must be the type of array or string');
  }
}

function checkValueForPrecisionConversion(value) {
  if (!value && value !== 0 && !isNaN(value)) {
    throw new Error('Value must be defined');
  }
  if (typeof value !== 'number') {
    throw new Error('Value must be the type of number');
  }
}

function checkOptions(options) {
  const mode = options.mode;
  const returnType = options.returnType;
  if (mode !== 'half' && mode !== 'single' && mode !== 'double') {
    throw new Error('Mode option must be either half, single or double');
  }
  if (returnType && returnType !== '8bitArray' && returnType !== '16bitArray') {
    throw new Error('Returntype option must either undefined, 8bitArray or 16bitArray');
  }
}

exports.validate = function validate(mode, value, options) {
  if (mode === 'decimalPrecision') {
    checkValueForPrecisionConversion(value);
    checkOptions(options);
  }
  else if (mode === 'precisionDecimal') {
    checkValueForDecimalConversion(value);
    checkOptions(options);
  }
  else {
    throw new Error('Validate function is missing the mode');
  }
}