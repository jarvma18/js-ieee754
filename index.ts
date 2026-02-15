import * as decimalPrecision from './src/decimalPrecision';
import * as precisionDecimal from './src/precisionDecimal';
import * as validationHelpers from './src/validationHelpers';
import * as utils from './src/utils';

export type PrecisionMode = 'half' | 'single' | 'double';
type ReturnType = '8bitArray' | '16bitArray';

type GetPrecisionOptions = {
  mode: PrecisionMode;
  returnType?: ReturnType;
};

type GetDecimalOptions = {
  mode: PrecisionMode;
};

function precisionToType(precision: string, options?: GetPrecisionOptions): string | number[] {
  if (options && options.returnType === '16bitArray') {
    return utils.createInt(precision, 16);
  }
  else if (options && options.returnType === '8bitArray') {
    return utils.createInt(precision, 8);
  }
  else {
    return precision;
  }
}

export function getDecimal(value: string | number[], options: GetDecimalOptions): number | undefined {
  try {
    validationHelpers.validate('precisionDecimal', value, options);
    const bits = utils.setDefaultBitsForPrecision(options.mode);
    const mantissa = utils.setDefaultMantissaForPrecision(options.mode);
    let binaryValue = typeof value === 'object' ? utils.createBinaryString(value, bits) : value;
    return precisionDecimal.precisionToDecimal(binaryValue, bits, mantissa);
  }
  catch(err) {
    console.log(err);
  }
}

export function getPrecision(value: number, options: GetPrecisionOptions): string | number[] | undefined {
  try {
    validationHelpers.validate('decimalPrecision', value, options);
    const bits = utils.setDefaultBitsForPrecision(options.mode);
    const mantissa = utils.setDefaultMantissaForPrecision(options.mode);
    let precision = decimalPrecision.decimalToPrecision(value, bits, mantissa);
    return precisionToType(precision, options);
  }
  catch(err) {
    console.log(err);
  }
}

export default { getDecimal, getPrecision };
