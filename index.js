'use strict'

function createUnsignedBinaryString(value, unsignedLength) {
  let binary = (value >>> 0).toString(2);
  let unsigned = '';
  for (let i = binary.length; i < unsignedLength; i++) {
    unsigned += '0';
  }
  return unsigned + binary;
}

function createBinaryString(value, bits, isLowEndian) {
  let bytes = bits / 8;
  let valueLength = value.length;
  let binary = '';
  if (valueLength === 0) {
    throw new Error('Object has no length');
  }
  if (value && isLowEndian) {
    value.reverse();
  }
  if (valueLength === bytes || valueLength === (bytes / 2)) {
    let unsignedBits = 16;
    if (valueLength === bytes) {
      unsignedBits = 8;
    }
    for (let i = 0; i < valueLength; i++) {
      binary += createUnsignedBinaryString(value[i], unsignedBits);
    }
  }
  else {
    throw new Error('Object length does not match the floating point precision');
  }
  return binary;
}

function precisionToDecimal(value, bits, mantissa, bias) {
  let sign = null;
  let exponent = '';
  let fraction = 0;
  for (let i = 0; i < bits; i++) {
    if (value[i] !== '0' && value[i] !== '1') {
      throw new Error('Binary string is invalid');
    }
    if (i === 0) {
      sign = parseInt(value[i], 2);
    }
    else if (i > 0 && i < (bits - mantissa)) {
      exponent += value[i];
    }
    else if (i >= (bits - mantissa)) {
      let bit = parseInt(value[i], 2);
      let powerOfTwo = Math.pow(2, (-1 * (i - (bits - mantissa) + 1)));
      fraction += bit * powerOfTwo;
    }
  }
  exponent = parseInt(exponent, 2);
  if (exponent === 0 && fraction === 0) {
    if (sign === 0) {
      return 0.0;
    }
    else if (sign === 1) {
      return -0.0;
    }
  }
  if (exponent === 255 && fraction === 0) {
    if (sign === 0) {
      return Infinity;
    }
    else if (sign === 1) {
      return -Infinity;
    }
  }
  if (exponent === 255 && fraction !== 0) {
    return NaN;
  }
  if (exponent === 0) {
    return Math.pow(-1, sign) * (fraction) * Math.pow(2, -126);
  }
  return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

exports.halfToDecimal = function halfToDecimal() {

};
exports.decimalToHalf = function decimalToHalf() {

};

exports.singleToDecimal = function singleToDecimal(value, isLowEndian) {
  let binaryString = value;
  if (!value.length) {
    throw new Error('Object must have length and be the type of array or string');
  }
  if (typeof value === 'object') {
    try {
      binaryString = createBinaryString(value, 32, isLowEndian);
    }
    catch(error) {
      console.log(error);
    }
  }
  try {
    return precisionToDecimal(binaryString, 32, 23, 127)
  }
  catch(error) {
    console.log(error);
  }
};
exports.decimalToSingle = function decimalToSingle(value, isLowEndian, returnType) {

};

exports.doubleToDecimal = function doubleToDecimal() {

};
exports.decimalToDouble = function decimalToDouble() {

};

exports.doublePrecision = function doublePrecision() {

};