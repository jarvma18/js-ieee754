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
# js-ieee754

Lightweight helpers to convert between JS numbers and IEEE‑754 binary representations (half/single/double precision).

This project has been migrated to TypeScript. The source files live in `src/` (TypeScript) and the package emits compiled JavaScript and type declarations to `lib/`.

Quick highlights

- Supports `half` (16‑bit), `single` (32‑bit) and `double` (64‑bit) modes.
- Exposes two primary functions: `getPrecision(number, options)` and `getDecimal(value, options)`.
- Handles special values: `NaN`, `Infinity`, `-Infinity`, `+0`, `-0`, and denormals.

Installation

```bash
npm install
```

Build (TypeScript)

```bash
npm run build
# emits compiled JS and type declarations to lib/
```

Tests

Tests run under Jest with `ts-jest`, so they can execute against the TypeScript sources directly. Run the test suite with:

```bash
npm test
```

Usage

CommonJS (Node):

```javascript
const ieee754 = require('./'); // loads compiled lib/index.js when installed
const bin = ieee754.getPrecision(1000.5, { mode: 'single' });
```

ESM / TypeScript import:

```ts
import * as ieee754 from './';
const bytes = ieee754.getPrecision(1000.5, { mode: 'single', returnType: '8bitArray' });
```

API (summary)

- `getPrecision(value: number, options)`
  - `options.mode`: `'half' | 'single' | 'double'` (required)
  - `options.returnType` (optional): controls the output form (binary string or numeric array)

- `getDecimal(value: string | number[], options)`
  - `options.mode`: `'half' | 'single' | 'double'` (required)
  - Accepts binary strings or arrays of integers representing bytes/words and returns a JS `number`.

Project layout

- `index.ts` — library entry (exports `getPrecision`, `getDecimal`).
- `src/*.ts` — implementation modules (migrated from JS).
- `lib/` — compiled output (`lib/index.js`, `lib/index.d.ts`) after `npm run build`.
- `package.json` is configured to point `main` at `lib/index.js` and `types` at `lib/index.d.ts`.

Notes

- Tests use `ts-jest` so they run against TypeScript sources; you do not need to build before running tests.
- The public API and usage remain the same, but the codebase is now typed and emits `.d.ts` files for consumers.

Contributing

Contributions are welcome — please open issues or PRs. If you work on code, prefer making TypeScript changes and run the test suite locally.

License

This project is MIT licensed. See the `LICENSE` file for details.
