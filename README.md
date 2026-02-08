# js-ieee754

Lightweight JavaScript helpers to convert between JS numbers and IEEE‑754 binary representations (half/single/double precision).

This repo provides two main functions exposed from `index.js`:

- `getPrecision(number, options)` — convert a JavaScript `number` into an IEEE‑754 representation.
- `getDecimal(value, options)` — convert an IEEE‑754 representation (binary string or integer array) back to a JS `number`.

Quick highlights
- Supports `half` (16‑bit), `single` (32‑bit) and `double` (64‑bit) modes.
- Output can be a binary string, an array of 16‑bit integers (`16bitArray`) or an array of 8‑bit bytes (`8bitArray`).
- Handles special values: `NaN`, `Infinity`, `-Infinity`, `+0`, `-0`, and denormals.

## Installation

```bash
npm install
```

## Usage (CommonJS)

```javascript
const ieee754 = require('./'); // requires index.js in the project root

// Convert number -> IEEE representation (string by default)
const bin = ieee754.getPrecision(1000.5, { mode: 'single' });
// -> '01000100011110100010000000000000'

// Convert number -> 8-bit byte array
const bytes = ieee754.getPrecision(1000.5, { mode: 'single', returnType: '8bitArray' });
// -> [68, 122, 32, 0]

// Convert binary string or integer array -> number
const num = ieee754.getDecimal('01000100011110100010000000000000', { mode: 'single' });
// -> 1000.5
const numFromArray = ieee754.getDecimal([68, 122, 32, 0], { mode: 'single' });
// -> 1000.5
```

## API

- `getPrecision(value, options)`
  - `value` (number): input JS number to convert.
  - `options` (object):
    - `mode`: `'half' | 'single' | 'double'` (required)
    - `returnType` (optional): `'8bitArray' | '16bitArray'`. If omitted, the function returns a binary string.
  - Returns: binary string, or array of integers depending on `returnType`.

- `getDecimal(value, options)`
  - `value` (string | array): binary string or an array of 8‑bit/16‑bit integers representing IEEE‑754 bits.
  - `options` (object):
    - `mode`: `'half' | 'single' | 'double'` (required)
  - Returns: JavaScript `number`.

## Tests

The project uses Jest. Run the test suite with:

```bash
npm test
```

## Notes & tips

- The implementation uses CommonJS (`require` / `exports`) and small helper modules inside `src/`:
  - `src/decimalPrecision.js` — number -> IEEE binary string
  - `src/precisionDecimal.js` — IEEE binary string -> number
  - `src/shared.js` — utilities (bias, binary formatting)
  - `src/validation.js` — simple argument validation

## TODO

Short, actionable items:

- Core: code refactoring and performance improvements
- Precision: improve rounding and handle rounding errors
- Edge cases: values under 1 / denormals, underflow, overflow
- Robustness: better error catching and invalid-input handling
- Defaults: provide sensible defaults when `options` is omitted
- Tests: add additional Jest coverage for edge cases and rounding

## Contributing

Contributions are welcome. The repository currently lists a number of TODOs (rounding improvements, better error handling, more tests). Opening issues or pull requests on the GitHub repo is the best way to contribute.

## License

This project is MIT licensed. See the `LICENSE` file for details.
