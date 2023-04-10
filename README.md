# IEEE754 for Javascript
Javascript library to convert ieee-754 values to decimal format and vice versa.
To do:

* Code refactoring/optimizing
* Underflow
* Overflow
* Handling the rounding errors
* Error catching
* Catching wrong inputs
* Some additional test with jest

## How to use
```javascript
const ieee754 = require(./ieee754);

console.log(ieee754.getDecimal([17530, 8192]); // 1000.5
console.log(ieee754.getPrecision(1000.5, {mode: 'single', returnType: '16bitArray'})) // [17530, 8192]
console.log(ieee754.getPrecision(1000.5, {mode: 'single'})) // 01000100011110100010000000000000
console.log(ieee754.getDecimal([0, 0]); // 0
console.log(ieee754.getPrecision(0, {mode: 'single', returnType: '16bitArray'})) // [0, 0]
console.log(ieee754.getPrecision(0, {mode: 'single'})) // 00000000000000000000000000000000

```