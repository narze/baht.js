# Baht.js

<span class="badge-npmversion"><a href="https://npmjs.org/package/baht" title="View this project on NPM"><img src="https://img.shields.io/npm/v/baht.svg" alt="NPM version" /></a></span> <!-- <span class="badge-npmdownloads"><a href="https://npmjs.org/package/baht" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/baht.svg" alt="NPM downloads" /></a></span> --> [![install size](https://packagephobia.com/badge?p=baht)](https://packagephobia.com/result?p=baht)

Convert number to Thai Baht format, but faster & fully typed.

## Usage

- Install with npm or yarn

  ```shell
  npm install baht
  # or
  yarn add baht
  ```

- Import and use

  ```javascript
  import { convert } from 'baht';

  convert(42); // "สี่สิบสองบาทถ้วน"
  convert(123.45); // "หนึ่งร้อยยี่สิบสามบาทสี่สิบห้าสตางค์"
  ```

## Features

- Converts number to Thai Baht formatted string.
- Converts long number (Use string format to prevent precision loss.)
- Supports 2 decimal places (Satangs), for over 2 decimal places it will round down.
- Supports negative number.

## Benchmark

Run the benchmark to measure the speed among other libraries.

- Apple Macbook Pro M1

  ```shell
  yarn benchmark

  baht 0.5.0 (x100000): 355ms
  baht 0.4.0 (x100000): 665ms
  baht 0.3.2 (x100000): 2968ms
  thaiBahtLib (x100000): 3189ms
  bahttext (x100000): 3503ms
  BAHTTEXT.js (x100000): 4816ms
  thai-baht-text-ts (x100000): 7710ms
  thai-baht-text (x100000): 8525ms
  ```

Baht.js is the fastest!

## LICENSE

MIT
