'use strict'

const decimalPrecision = require('./src/decimalPrecision');
const precisionDecimal = require('./src/precisionDecimal');
const validation = require('./src/validation');
const shared = require('./src/shared');

function createBinaryString(value, bits) {
  let signed = value.length;
  let binary = '';
  let unsigned = bits / signed;
  for (let i = 0; i < signed; i++) {
    binary += shared.createUnsignedBinaryString(value[i], unsigned);
  }
  return binary;
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

function precisionToType(precision, options) {
  if (options && options.returnType === '16bitArray') {
    return createInt(precision, 16);
  }
  else if (options && options.returnType === '8bitArray') {
    return createInt(precision, 8);
  }
  else {
    return precision;
  }
}

exports.getDecimal = function getDecimal(value, options) {
  try {
    validation.validate('precisionDecimal', value, options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    if (typeof value === 'object') {
      value = createBinaryString(value, bits);
    }
    return precisionDecimal.precisionToDecimal(value, bits, mantissa);
  }
  catch(err) {
    console.log(err);
  }
};

exports.getPrecision = function getPrecision(value, options) {
  try {
    validation.validate('decimalPrecision', value, options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    let precision = decimalPrecision.decimalToPrecision(value, bits, mantissa);
    return precisionToType(precision, options);
  }
  catch(err) {
    console.log(err);
  }
};