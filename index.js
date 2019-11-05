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

function createUnsignedBinaryString(value, unsignedLength) {
  let binary = (value >>> 0).toString(2);
  for (let i = binary.length; i < unsignedLength; i++) {
    binary = '0' + binary;
  }
  return binary;
}

function createBinaryString(value, bits, isLowEndian) {
  let signedLength = value.length;
  let binary = '';
  if (!signedLength) {
    throw new Error('Object has no length');
  }
  if (value && isLowEndian) {
    value.reverse();
  }
  let unsignedLength = bits / signedLength;
  for (let i = 0; i < signedLength; i++) {
    binary += createUnsignedBinaryString(value[i], unsignedLength);
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
      for (let j = 0; j < (mantissa - i); j++) {
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

function precisionToDecimal(value, bits, mantissa) {
  let bias = createBias(bits - mantissa - 1);
  let sign = parseInt(value[0], 2);
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
  if (exponent === 255 && fraction === 0) {
    return Math.pow(-1, sign) * Infinity;
  }
  if (exponent === 255 && fraction !== 0) {
    return NaN;
  }
  if (exponent === 0) {
    return Math.pow(-1, sign) * (fraction) * Math.pow(2, -126);
  }
  return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

function decimalToPrecision(value, bits, mantissa) {
  if (value === 0) {
    let zeroBinary = createSign(value).toString();
    for (let i = 1; i < bits; i++) {
      zeroBinary = zeroBinary + '0';
    }
    return zeroBinary;
  }
  if (value === Infinity || value === -Infinity) {
    let infinityBinary = createSign(value).toString();
    for (let i = 1; i < (bits - mantissa); i++) {
      infinityBinary = infinityBinary + '1';
    }
    for (let i = (bits - mantissa); i < bits; i++) {
      infinityBinary = infinityBinary + '0';
    }
    return infinityBinary;
  }
  if (isNaN(value)) {
    let nanBinary = '0';
    for (let i = 1; i < bits; i++) {
      nanBinary = nanBinary + '1';
    }
    return nanBinary;
  }
  let isDenormal = false;
  let round = true;
  let sign = createSign(value);
  let bias = createBias(bits - mantissa - 1);
  value = Math.pow(-1, sign) * value;
  if (value < 1) {
    let exponent = '';
    if (value < Math.pow(2, (-1 * (bias - 1)))) {
      isDenormal = true;
      value = value / Math.pow(2, -126);
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
    return precisionToDecimal(binaryString, 32, 23)
  }
  catch(error) {
    console.log(error);
  }
};

exports.decimalToSingle = function decimalToSingle(value, isLowEndian, returnType) {
  return decimalToPrecision(value, 32, 23);
};

exports.doubleToDecimal = function doubleToDecimal() {

};
exports.decimalToDouble = function decimalToDouble() {

};

exports.doublePrecision = function doublePrecision() {

};