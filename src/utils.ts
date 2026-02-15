import { PrecisionMode } from '..';

export function createBias(exponent: number): number {
  return Math.pow(2, exponent - 1) - 1;
}

export function createUnsignedBinaryString(value: number, unsigned: number): string {
  let binary = (value >>> 0).toString(2);
  for (let i = binary.length; i < unsigned; i++) {
    binary = '0' + binary;
  }
  return binary;
}

export function createBinaryString(value: number[], bits: number): string {
  let signed = value.length;
  let binary = '';
  let unsigned = bits / signed;
  for (let i = 0; i < signed; i++) {
    binary += createUnsignedBinaryString(value[i], unsigned);
  }
  return binary;
}

export function createInt(value: string, bits: number): number[] {
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

export function setDefaultBitsForPrecision(precision: PrecisionMode): number {
  if (precision === 'half') { return 16; }
  if (precision === 'single') { return 32; }
  if (precision === 'double') { return 64; }
  return 16;
}

export function setDefaultMantissaForPrecision(precision: PrecisionMode): number {
  if (precision === 'half') { return 10; }
  if (precision === 'single') { return 23; }
  if (precision === 'double') { return 52; }
  return 10;
}

