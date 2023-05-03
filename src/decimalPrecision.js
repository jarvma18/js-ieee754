'use strict'

const shared = require('./shared');

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

function createSign(value) {
  if (value === 0) {
    value = 1 / value;
  }
  return value ? value < 0 ? 1 : 0 : 0;
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

function calculateDenominator(counter) {
  return Math.pow(2, -1 * counter);
}

function buildPrecisionForUnderOneValues(bits, mantissa, isDenormal, round, sign, bias, minExponent, value) {
  let exponent = '';
    if (value < minExponent) {
      isDenormal = true;
      value = value / minExponent;
      exponent = shared.createUnsignedBinaryString(0, bits - mantissa - 1);
    }
    else {
      let counter = 0;
      while (value < 1) {
        counter++;
        let denominator = calculateDenominator(counter);
        value = ((value / denominator) >= 1 && (value / denominator) < 2) ? (value / denominator) : value;
      }
      exponent = parseInt(-1 * counter + bias);
      exponent = shared.createUnsignedBinaryString(exponent, bits - mantissa - 1);
    }
    let startFraction = value - parseInt(value);
    let currentValue = startFraction;
    if (isDenormal) {
      round = false;
    }
    let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
    return sign + exponent + fraction;
}

function buildPrecisionForOverOneValues(bits, mantissa, round, sign, bias, value) {
  let integer = parseInt((value) >>> 0).toString(2);
  let exponent = parseInt(integer.length - 1 + bias);
  exponent = shared.createUnsignedBinaryString(exponent, bits - mantissa - 1);
  let startFraction = value - parseInt(value);
  let currentValue = startFraction;
  let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
  fraction = (integer + fraction).slice(1, mantissa + 1);
  return sign + exponent + fraction;
}

function calculateMinExponent(bias) {
  return Math.pow(2, (-1 * (bias - 1)));
}

function calculateValueWithSign(sign, value) {
  return Math.pow(-1, sign) * value;
}

exports.decimalToPrecision = function decimalToPrecision(value, bits, mantissa) {
  const specialValue = checkAndBuildSpecials(value, bits);
  if (specialValue) {
    return specialValue;
  }
  let isDenormal = false;
  let round = true;
  let sign = createSign(value);
  let bias = shared.createBias(bits - mantissa - 1);
  let minExponent = calculateMinExponent(bias);
  value = calculateValueWithSign(sign, value);
  if (value < 1) {
    return buildPrecisionForUnderOneValues(bits, mantissa, isDenormal, round, sign, bias, minExponent, value);
  }
  else {
    return buildPrecisionForOverOneValues(bits, mantissa, round, sign, bias, value);
  }
}