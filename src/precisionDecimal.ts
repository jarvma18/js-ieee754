import * as utils from './utils';

function createMaxExponent(bits: number, mantissa: number): number {
  return Math.pow(2, (bits - mantissa - 1)) - 1;
}

function calculateAddingToFraction(value: string, bits: number, mantissa: number, i: number): number {
  return parseInt(value, 2) * Math.pow(2, (-1 * (i - (bits - mantissa) + 1)));
}

function calculateSpecials(sign: number, exponent: number, fraction: number, maxExponent: number, bias: number): number | null {
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

function calculateDecimal(sign: number, exponent: number, fraction: number, bias: number): number {
  return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

export function precisionToDecimal(value: string, bits: number, mantissa: number): number {
  let bias = utils.createBias(bits - mantissa - 1);
  let sign = parseInt(value[0], 2);
  let maxExponent = createMaxExponent(bits, mantissa);
  let exponentStr = '';
  let fraction = 0;
  for (let i = 1; i < (bits - mantissa); i++) {
    exponentStr += value[i];
  }
  for (let i = (bits - mantissa); i < bits; i++) {
    fraction += calculateAddingToFraction(value[i], bits, mantissa, i);
  }
  let exponent = parseInt(exponentStr, 2);
  const specialValue = calculateSpecials(sign, exponent, fraction, maxExponent, bias);
  if (specialValue !== null) {
    return specialValue;
  }
  return calculateDecimal(sign, exponent, fraction, bias);
}
