'use strict'

const shared = require('./shared');

function createMaxExponent(bits, mantissa) {
  return Math.pow(2, (bits - mantissa - 1)) - 1;
}

function calculateAddingToFraction(value, bits, mantissa, i) {
  return parseInt(value, 2) * Math.pow(2, (-1 * (i - (bits - mantissa) + 1)));
}

function calculateSpecials(sign, exponent, fraction, maxExponent, bias) {
  if (exponent === 0 && fraction === 0) {
    return Math.pow(-1, sign) * 0.0;
  }
  else if (exponent === maxExponent && fraction === 0) {
    return Math.pow(-1, sign) * Infinity;
  }
  else if (exponent === maxExponent && fraction !== 0) {
    return NaN;
  }
  else if (exponent === 0) {
    return Math.pow(-1, sign) * (fraction) * Math.pow(2, (-1 * (bias - 1)));
  }
  else {
    return null;
  }
}

function calculateDecimal(sign, exponent, fraction, bias) {
  return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

exports.precisionToDecimal = function precisionToDecimal(value, bits, mantissa) {
  let bias = shared.createBias(bits - mantissa - 1);
  let sign = parseInt(value[0], 2);
  let maxExponent = createMaxExponent(bits, mantissa);
  let exponent = '';
  let fraction = 0;
  for (let i = 1; i < (bits - mantissa); i++) {
    exponent += value[i];
  }
  for (let i = (bits - mantissa); i < bits; i++) {
    fraction += calculateAddingToFraction(value[i], bits, mantissa, i);
  }
  exponent = parseInt(exponent, 2);
  const specialValue = calculateSpecials(sign, exponent, fraction, maxExponent, bias);
  if (specialValue) {
    return specialValue;
  }
  return calculateDecimal(sign, exponent, fraction, bias);
}