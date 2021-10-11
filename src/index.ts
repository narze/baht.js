const ONE = 'หนึ่ง';
const THREE_TO_NINE = ['สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const ED = 'เอ็ด';
const DIGIT = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน'];
const ONES = ['', ED, 'สอง', ...THREE_TO_NINE];
const TENS = ['', ...['', 'ยี่', ...THREE_TO_NINE].map(t => t + DIGIT[1])];
const SUB_HUNDRED = TENS.flatMap(t => ONES.map(o => t + o));
SUB_HUNDRED[1] = ONE;
const SUB_TEN = [
  '',
  ONE,
  'สอง',
  ...['สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'],
];

function numberToWords(num: string): string {
  let output = '';
  let length = num.length;

  Array.from(num).forEach((d, idx) => {
    const digitIdx = (length - idx - 1) % 6;
    const isMillion = length - 1 !== idx && digitIdx === 0;

    if (d === '0') {
      if (isMillion) {
        output += 'ล้าน';
      }

      return;
    }
    const digit = DIGIT[digitIdx];
    const unit = SUB_TEN[Number(d)];

    const isSib = digitIdx === 1;

    if (isSib && d === '1') {
      output += digit;
    } else if (isSib && d === '2') {
      output += 'ยี่' + digit;
    } else if (idx !== 0 && digitIdx === 0 && d === '1') {
      output += 'เอ็ด';
    } else {
      output += unit + digit;
    }

    if (isMillion) {
      output += 'ล้าน';
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

  let output = '';

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
