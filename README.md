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
* Add default value if no options are passed
* Add error handling if no value is passed

## How to use
```javascript
const ieee754 = require(./ieee754);
const optionsWithReturnType = {mode: 'single', returnType: '16bitArray'};
const optionsWithoutReturnType = {mode: 'single'};

console.log(ieee754.getDecimal([17530, 8192]);
// --> 1000.5
console.log(ieee754.getPrecision(1000.5, optionsWithReturnType));
// --> [17530, 8192]
console.log(ieee754.getPrecision(1000.5, optionsWithoutReturnType));
// --> 01000100011110100010000000000000
console.log(ieee754.getDecimal([0, 0]);
// --> 0
console.log(ieee754.getPrecision(0, optionsWithReturnType));
// --> [0, 0]
console.log(ieee754.getPrecision(0, optionsWithoutReturnType));
// --> 00000000000000000000000000000000
```

## How to test with Jest
### Install Jest to project
```
npm install
```
### Run tests
```
npm test
```