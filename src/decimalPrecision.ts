import * as shared from './shared';

function createBinaryFromFraction(value: number, mantissa: number, startFraction: number, round: boolean): string {
  let fraction = '';
  for (let i = 0; i < mantissa; i++) {
    value = value * 2;
    fraction += ((value >>> 0).toString(2));
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

function createSign(value: number): number {
  if (value === 0) {
    value = 1 / value;
  }
  return value ? value < 0 ? 1 : 0 : 0;
}

function checkAndBuildSpecials(value: number, bits: number): string | null | undefined {
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

function calculateDenominator(counter: number): number {
  return Math.pow(2, -1 * counter);
}

function buildPrecisionForUnderOneValues(
  bits: number,
  mantissa: number,
  isDenormal: boolean,
  round: boolean,
  sign: number,
  bias: number,
  minExponent: number,
  value: number
): string {
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
    const exponentValue = -1 * counter + bias;
    exponent = shared.createUnsignedBinaryString(exponentValue, bits - mantissa - 1);
  }
  let startFraction = value - Math.trunc(value);
  let currentValue = startFraction;
  if (isDenormal) {
    round = false;
  }
  let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
  return sign + exponent + fraction;
}

function buildPrecisionForOverOneValues(
  bits: number,
  mantissa: number,
  round: boolean,
  sign: number,
  bias: number,
  value: number
): string {
  let integer = ((value >>> 0).toString(2));
  const exponentValue = integer.length - 1 + bias;
  let exponent = shared.createUnsignedBinaryString(exponentValue, bits - mantissa - 1);
  let startFraction = value - Math.trunc(value);
  let currentValue = startFraction;
  let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
  fraction = (integer + fraction).slice(1, mantissa + 1);
  return sign + exponent + fraction;
}

function calculateMinExponent(bias: number): number {
  return Math.pow(2, (-1 * (bias - 1)));
}

function calculateValueWithSign(sign: number, value: number): number {
  return Math.pow(-1, sign) * value;
}

export function decimalToPrecision(value: number, bits: number, mantissa: number): string {
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
