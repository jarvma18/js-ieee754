'use strict'

exports.createBias = function createBias(exponent) {
  return Math.pow(2, exponent - 1) - 1;
};

exports.createUnsignedBinaryString = function createUnsignedBinaryString(value, unsigned) {
  let binary = (value >>> 0).toString(2);
  for (let i = binary.length; i < unsigned; i++) {
    binary = '0' + binary;
  }
  return binary;
}