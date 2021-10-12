const ONE = 'หนึ่ง';
const TWO = 'สอง';
const THREE_TO_NINE = ['สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const ED = 'เอ็ด';
const YEE = 'ยี่';
const LAN = 'ล้าน';
const EMPTY = '';
const DIGIT = [EMPTY, 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน'];
const ONES = [EMPTY, ED, TWO, ...THREE_TO_NINE];
const TENS = [EMPTY, ...[EMPTY, YEE, ...THREE_TO_NINE].map(t => t + DIGIT[1])];
const SUB_HUNDRED = TENS.flatMap(t => ONES.map(o => t + o));
SUB_HUNDRED[1] = ONE;
const SUB_TEN = [EMPTY, ONE, TWO, ...THREE_TO_NINE];

function numberToWords(num: string): string {
  let output = EMPTY;
  const length = num.length;

  Array.from(num).forEach((d, idx) => {
    const digitIdx = (length - idx - 1) % 6;
    const isMillion = length - 1 !== idx && digitIdx === 0;

    if (d === '0') {
      if (isMillion) {
        output += LAN;
      }

      return;
    }

    const isSib = digitIdx === 1;
    if (isSib) { return; }

    const isNuay = digitIdx === 0;

    if (isNuay) {
      const n = Number(d) + Number(num[idx - 1] || 0) * 10;
      if (n === 1 && idx !== 0) {
        output += ED;
      } else {
        output += SUB_HUNDRED[n];
      }
    } else {
      output += SUB_TEN[Number(d)] + DIGIT[digitIdx];
    }

    // if (isSib && d === '1') {
    //   output += DIGIT[digitIdx];
    // } else if (isSib && d === '2') {
    //   output += YEE + DIGIT[digitIdx];
    // } else if (idx !== 0 && digitIdx === 0 && d === '1') {
    //   output += ED;
    // } else {
    //   output += SUB_TEN[Number(d)] + DIGIT[digitIdx];
    // }

    if (isMillion) {
      output += LAN;
    }
  });

  return output;
}

export function convert(input: number | string): string | boolean {
  let baht: number;
  let bahtStr: string;
  let satang: number;
  let satangStr: string | undefined;
  let isNegative = false;

  if (typeof input === 'number') {
    if (input < 0) {
      isNegative = true;
      input = -input;
    }
    baht = Math.floor(input);
    satang = Number.isInteger(input) ? 0 : Math.floor((input * 100) % 100);
    bahtStr = baht.toString();
  } else if (typeof input === 'string') {
    const inputNum = Number(input);

    if (isNaN(inputNum)) {
      return false;
    }

    [bahtStr, satangStr] = input.toString().split('.');

    baht = Math.floor(Number(bahtStr));
    satang = satangStr ? Math.floor(Number('0.' + satangStr) * 100) : 0;

    if (baht < 0) {
      isNegative = true;
      baht = -baht;
      bahtStr = baht.toString();
    }
  } else {
    return false;
  }

  if (!baht && !satang) {
    return 'ศูนย์บาทถ้วน';
  }

  let output = EMPTY;

  // Baht
  output += numberToWords(bahtStr);

  // Satang
  if (satang) {
    if (baht) output += 'บาท';

    // Faster!
    output += SUB_HUNDRED[satang] + 'สตางค์';
    // output += numberToWords(satang.toString()) + 'สตางค์';
  } else {
    output += 'บาทถ้วน';
  }

  if (isNegative) {
    output = 'ลบ' + output;
  }

  return output;
}
