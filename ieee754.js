'use strict'

function createBias(exponent) {
  return Math.pow(2, exponent - 1) - 1;
}

function createSign(value) {
  if (value === 0) {
    value = 1 / value;
  }
  return value ? value < 0 ? 1 : 0 : 0;
}

function createUnsignedBinaryString(value, unsigned) {
  let binary = (value >>> 0).toString(2);
  for (let i = binary.length; i < unsigned; i++) {
    binary = '0' + binary;
  }
  return binary;
}

function createBinaryString(value, bits) {
  let signed = value.length;
  let binary = '';
  let unsigned = bits / signed;
  for (let i = 0; i < signed; i++) {
    binary += createUnsignedBinaryString(value[i], unsigned);
  }
  return binary;
}

function createBinaryFromFraction(value, mantissa, startFraction, round) {
  let fraction = '';
  for (let i = 0; i < mantissa; i++) {
    value = value * 2;
    fraction += parseInt((value) >>> 0).toString(2);
    if (value > 1) {
      value = value - 1;
    }
    if (value === startFraction || value === 1) {
      if (round && (fraction[i] === '0' && value > 0.05)) {
        fraction = fraction.slice(0, i - 1);
        fraction += '1';
      }
      for (let j = 0; j < (mantissa - 1 - i); j++) {
        fraction += '0';
      }
      break;
    }
    if (i === mantissa - 1) {
      if (round && (fraction[i] === '0' && value > 0.05)) {
        fraction = fraction.slice(0, i);
        fraction += '1';
      }
    }
  }
  return fraction;
}

function createInt(value, bits) {
  let array = [];
  for (let i = 0; i < (value.length / bits); i++) {
    let binary = '';
    for (let j = i * bits; j < ((i + 1) * bits); j++) {
      binary += value[j];
    }
    array.push(parseInt(binary, 2));
  }
  return array;
}

function precisionToDecimal(value, bits, mantissa) {
  let bias = createBias(bits - mantissa - 1);
  let sign = parseInt(value[0], 2);
  let maxExponent = Math.pow(2, (bits - mantissa - 1)) - 1;
  let exponent = '';
  let fraction = 0;
  for (let i = 1; i < (bits - mantissa); i++) {
    exponent += value[i];
  }
  for (let i = (bits - mantissa); i < bits; i++) {
    fraction += parseInt(value[i], 2) * Math.pow(2, (-1 * (i - (bits - mantissa) + 1)));
  }
  exponent = parseInt(exponent, 2);
  if (exponent === 0 && fraction === 0) {
    return Math.pow(-1, sign) * 0.0;
  }
  if (exponent === maxExponent && fraction === 0) {
    return Math.pow(-1, sign) * Infinity;
  }
  if (exponent === maxExponent && fraction !== 0) {
    return NaN;
  }
  if (exponent === 0) {
    return Math.pow(-1, sign) * (fraction) * Math.pow(2, (-1 * (bias - 1)));
  }
  return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

function checkAndBuildSpecials(value, bits) {
  if (value === 0) {
    const zeroIndex = createSign(value).toString();
    if (bits === 16) { return zeroIndex + '000000000000000'; }
    if (bits === 32) { return zeroIndex + '0000000000000000000000000000000'; }
    if (bits === 64) { return zeroIndex + '000000000000000000000000000000000000000000000000000000000000000'; }
  }
  else if (value === Infinity) {
    if (bits === 16) { return '0111110000000000'; }
    if (bits === 32) { return '01111111100000000000000000000000'; }
    if (bits === 64) { return '0111111111110000000000000000000000000000000000000000000000000000'; }
  }
  else if (value === -Infinity) {
    if (bits === 16) { return '1111110000000000'; }
    if (bits === 32) { return '11111111100000000000000000000000'; }
    if (bits === 64) { return '1111111111110000000000000000000000000000000000000000000000000000'; }
  }
  else if (isNaN(value)) {
    if (bits === 16) { return '0111111111111111'; }
    if (bits === 32) { return '01111111111111111111111111111111'; }
    if (bits === 64) { return '0111111111111111111111111111111111111111111111111111111111111111'; }
  }
  else {
    return null;
  }
}

// function buildPrecisionForUnderOneValues

function decimalToPrecision(value, bits, mantissa) {
  const specialValue = checkAndBuildSpecials(value, bits);
  if (specialValue) {
    return specialValue;
  }
  let isDenormal = false;
  let round = true;
  let sign = createSign(value);
  let bias = createBias(bits - mantissa - 1);
  let minExponent = Math.pow(2, (-1 * (bias - 1)));
  value = Math.pow(-1, sign) * value;
  if (value < 1) {
    let exponent = '';
    if (value < minExponent) {
      isDenormal = true;
      value = value / minExponent;
      exponent = createUnsignedBinaryString(0, bits - mantissa - 1);
    }
    else {
      let counter = 0;
      while (value < 1) {
        counter++;
        let denominator = Math.pow(2, -1 * counter);
        value = ((value / denominator) >= 1 && (value / denominator) < 2) ? (value / denominator) : value;
      }
      exponent = parseInt(-1 * counter + bias);
      exponent = createUnsignedBinaryString(exponent, bits - mantissa - 1);
    }
    let startFraction = value - parseInt(value);
    let currentValue = startFraction;
    if (isDenormal) {
      round = false;
    }
    let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
    return sign + exponent + fraction;
  }
  else {
    let integer = parseInt((value) >>> 0).toString(2);
    let exponent = parseInt(integer.length - 1 + bias);
    exponent = createUnsignedBinaryString(exponent, bits - mantissa - 1);
    let startFraction = value - parseInt(value);
    let currentValue = startFraction;
    let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
    fraction = (integer + fraction).slice(1, mantissa + 1);
    return sign + exponent + fraction;
  }
}

function setDefaultBitsForPrecision(precision) {
  if (precision === 'half') { return 16; }
  if (precision === 'single') { return 32; }
  if (precision === 'double') { return 64; }
  return 16;
}

function setDefaultMantissaForPrecision(precision) {
  if (precision === 'half') { return 10; }
  if (precision === 'single') { return 23; }
  if (precision === 'double') { return 52; }
  return 10;
}

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

exports.getDecimal = function getDecimal(value, options) {
  try {
    checkValueForDecimalConversion(value);
    checkOptions(options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    if (typeof value === 'object') {
      value = createBinaryString(value, bits);
    }
    return precisionToDecimal(value, bits, mantissa);
  }
  catch(err) {
    console.log(err);
  }
};

exports.getPrecision = function getPrecision(value, options) {
  try {
    checkValueForPrecisionConversion(value);
    checkOptions(options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    let precision = decimalToPrecision(value, bits, mantissa);
    if (options && options.returnType === '16bitArray') {
      return createInt(precision, 16);
    }
    else if (options && options.returnType === '8bitArray') {
      return createInt(precision, 8);
    }
    return precision;
  }
  catch(err) {
    console.log(err);
  }
};