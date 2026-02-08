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
