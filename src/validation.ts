type Mode = 'decimalPrecision' | 'precisionDecimal';
type PrecisionMode = 'half' | 'single' | 'double';
type ReturnType = '8bitArray' | '16bitArray' | undefined;

type Options = {
  mode: PrecisionMode;
  returnType?: ReturnType;
}

function checkValueForDecimalConversion(value: any): void {
  if (!value) {
    throw new Error('Value must be defined');
  }
  if (!value.length) {
    throw new Error('Value must have length');
  }
  if (typeof value !== 'object' && typeof value !== 'string') {
    throw new Error('Value must be the type of array or string');
  }
}

function checkValueForPrecisionConversion(value: any): void {
  if (!value && value !== 0 && !isNaN(value)) {
    throw new Error('Value must be defined');
  }
  if (typeof value !== 'number') {
    throw new Error('Value must be the type of number');
  }
}

function checkOptions(options: Options): void {
  const mode = options.mode;
  const returnType = options.returnType;
  if (mode !== 'half' && mode !== 'single' && mode !== 'double') {
    throw new Error('Mode option must be either half, single or double');
  }
  if (returnType && returnType !== '8bitArray' && returnType !== '16bitArray') {
    throw new Error('Returntype option must either undefined, 8bitArray or 16bitArray');
  }
}

export function validate(mode: Mode, value: any, options: Options): void {
  if (mode === 'decimalPrecision') {
    checkValueForPrecisionConversion(value);
    checkOptions(options);
  }
  else if (mode === 'precisionDecimal') {
    checkValueForDecimalConversion(value);
    checkOptions(options);
  }
  else {
    throw new Error('Validate function is missing the mode');
  }
}
