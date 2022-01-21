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

  for (let i = 0; i < length; i++) {
    const d = num[i];
    const di = length - i - 1;
    const diMod = di % 6;
    const isSib = diMod === 1;

    if (d === '0') {
      // No-op
    } else if (isSib && d === '1') {
      output += DIGIT[diMod];
    } else if (isSib && d === '2') {
      output += YEE + DIGIT[diMod];
    } else if (!diMod && d === '1' && i) {
      output += ED;
    } else {
      output += SUB_TEN[Number(d)] + DIGIT[diMod];
    }

    if (!diMod && di) {
      output += LAN;
    }
  }

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
    bahtStr = '' + baht;
  } else if (typeof input === 'string') {
    let negativeLeadingZeroPattern = /^-0+/;

    if (input.startsWith('-')) {
      if (input === '-0') {
        input = '0';
      } else {
        input = input.replace(negativeLeadingZeroPattern, '-');
      }
    }

    let inputNum = Number(input);

    if (isNaN(inputNum)) {
      return false;
    }

    if (inputNum < 0) {
      isNegative = true;
      inputNum = -inputNum;
      input = input.slice(1);
    }

    const inputStr = input;

    let periodIdx;
    if (
      inputStr.includes('.') &&
      (periodIdx = inputStr.lastIndexOf('.')) !== -1
    ) {
      bahtStr = inputStr.slice(0, periodIdx);
      baht = +bahtStr;
      satangStr = inputStr.slice(periodIdx + 1);
      satang = satangStr ? Math.floor(Number('0.' + satangStr) * 100) : 0;
    } else {
      baht = inputNum;
      bahtStr = inputStr;
      satang = 0;
    }
  } else {
    return false;
  }

  if (!baht && !satang) {
    return 'ศูนย์บาทถ้วน';
  }

  let output = isNegative ? 'ลบ' : EMPTY;

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

  return output;
}
