import * as decimalPrecision from './src/decimalPrecision';
import * as precisionDecimal from './src/precisionDecimal';
import * as validation from './src/validation';
import * as shared from './src/shared';

type PrecisionMode = 'half' | 'single' | 'double';
type ReturnType = '8bitArray' | '16bitArray';

type GetPrecisionOptions = {
  mode: PrecisionMode;
  returnType?: ReturnType;
};

type GetDecimalOptions = {
  mode: PrecisionMode;
};

function createBinaryString(value: Uint8Array | Uint16Array, bits: number): string {
  let signed = value.length;
  let binary = '';
  let unsigned = bits / signed;
  for (let i = 0; i < signed; i++) {
    binary += shared.createUnsignedBinaryString(value[i], unsigned);
  }
  return binary;
}

function createInt(value: string, bits: number): Uint8Array | Uint16Array {
  const tempArray: number[] = [];
  for (let i = 0; i < (value.length / bits); i++) {
    let binary = '';
    for (let j = i * bits; j < ((i + 1) * bits); j++) {
      binary += value[j];
    }
    tempArray.push(parseInt(binary, 2));
  }
  if (bits === 8) {
    return new Uint8Array(tempArray);
  } else {
    return new Uint16Array(tempArray);
  }
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

function precisionToType(precision: string, options?: GetPrecisionOptions): string | Uint8Array | Uint16Array {
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

export function getDecimal(value: string | Uint8Array | Uint16Array, options: GetDecimalOptions): number | undefined {
  try {
    validation.validate('precisionDecimal', value, options);
    const bits = setDefaultBitsForPrecision(options.mode);
    const mantissa = setDefaultMantissaForPrecision(options.mode);
    let binaryValue = typeof value === 'object' ? createBinaryString(value, bits) : value;
    return precisionDecimal.precisionToDecimal(binaryValue, bits, mantissa);
  }
  catch(err) {
    console.log(err);
  }
}

export function getPrecision(value: number, options: GetPrecisionOptions): string | Uint8Array | Uint16Array | undefined {
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
}

export default { getDecimal, getPrecision };
