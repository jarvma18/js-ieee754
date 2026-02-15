import * as decimalPrecision from './src/decimalPrecision';
import * as precisionDecimal from './src/precisionDecimal';
import * as validationHelpers from './src/validationHelpers';
import * as shared from './src/utils';

type PrecisionMode = 'half' | 'single' | 'double';
type ReturnType = '8bitArray' | '16bitArray';

type GetPrecisionOptions = {
  mode: PrecisionMode;
  returnType?: ReturnType;
};

type GetDecimalOptions = {
  mode: PrecisionMode;
};

function createBinaryString(value: number[], bits: number): string {
  let signed = value.length;
  let binary = '';
  let unsigned = bits / signed;
  for (let i = 0; i < signed; i++) {
    binary += shared.createUnsignedBinaryString(value[i], unsigned);
  }
  return binary;
}

function createInt(value: string, bits: number): number[] {
  let array: number[] = [];
  for (let i = 0; i < (value.length / bits); i++) {
    let binary = '';
    for (let j = i * bits; j < ((i + 1) * bits); j++) {
      binary += value[j];
    }
    array.push(parseInt(binary, 2));
  }
  return array;
}

function setDefaultBitsForPrecision(precision: PrecisionMode): number {
  if (precision === 'half') { return 16; }
  if (precision === 'single') { return 32; }
  if (precision === 'double') { return 64; }
  return 16;
}

function setDefaultMantissaForPrecision(precision: PrecisionMode): number {
  if (precision === 'half') { return 10; }
  if (precision === 'single') { return 23; }
  if (precision === 'double') { return 52; }
  return 10;
}

function precisionToType(precision: string, options?: GetPrecisionOptions): string | number[] {
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

export function getDecimal(value: string | number[], options: GetDecimalOptions): number | undefined {
  try {
    validationHelpers.validate('precisionDecimal', value, options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    let binaryValue = typeof value === 'object' ? createBinaryString(value, bits) : value;
    return precisionDecimal.precisionToDecimal(binaryValue, bits, mantissa);
  }
  catch(err) {
    console.log(err);
  }
}

export function getPrecision(value: number, options: GetPrecisionOptions): string | number[] | undefined {
  try {
    validationHelpers.validate('decimalPrecision', value, options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    let precision = decimalPrecision.decimalToPrecision(value, bits, mantissa);
    return precisionToType(precision, options);
  }
  catch(err) {
    console.log(err);
  }
}

export default { getDecimal, getPrecision };
