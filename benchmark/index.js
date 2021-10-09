const { bahttext } = require('bahttext');
const THBText = require('thai-baht-text');
const { ThaiBaht } = require('thai-baht-text-ts');
const BAHTTEXTjs = require('./BAHTTEXT');
const { convert } = require('../dist/fast-baht.cjs.production.min');

const times = 100000;
const numbers = [
  -1,
  0,
  0.01,
  0.1,
  0.11,
  0.12,
  0.123,
  0.2,
  0.21,
  0.25,
  0.255,
  0.5,
  0.75,
  0.99,
  0.999,
  1,
  10,
  11,
  11.25,
  12,
  20,
  21,
  22,
  100,
  100.5,
  101,
  111,
  121,
  567.01,
  1000000,
  1000001,
  6321298,
  10000000,
  10034567,
  11000000,
  11000001,
  20034567,
  30034567.0,
  100000000,
  123456789.999,
  1000000000,
  1000000000000,
  1000000000001,
  1001000000000,
  1001000000001,
  1001000001001,
  1000000000000000000,
];

const digits = num => {
  const res = [];
  num = Math.abs(num);
  while (num) {
    const last = num % 10;
    res.unshift(last);
    num = Math.floor(num / 10);
  }
  return res;
};

const libraries = {
  'fast-baht': n => convert(n),
  bahttext: n => bahttext(n),
  // 'BAHTTEXT.js': n => BAHTTEXTjs(n),
  // 'thai-baht-text': n => THBText(n),
  // 'thai-baht-text-ts': n => ThaiBaht(n),
  // 'array.mapNumber': n => Array.from('' + n).map(Number),
  // 'array.tostring-mapNumber': n => Array.from(n.toString()).map(Number),
  // 'array.map+': n => Array.from('' + n).map(n => +n),
  // 'array.tostring-map+': n => Array.from(n.toString()).map(n => +n),
};

Object.entries(libraries).forEach(([name, fn]) => {
  const start = new Date();

  new Array(times).fill(0).forEach(_ => {
    numbers.forEach(number => fn(number));
  });

  const end = new Date();

  console.log(`${name} (x${times}): ${end - start}ms`);
});
