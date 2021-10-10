const ONE = 'หนึ่ง';
const THREE_TO_NINE = ['สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const ED = 'เอ็ด';
const DIGITS = ['สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
const ONES = ['', ED, 'สอง', ...THREE_TO_NINE];
const TENS = ['', ...['', 'ยี่', ...THREE_TO_NINE].map(t => t + DIGITS[0])];
const SUB_HUNDRED = TENS.flatMap(t => ONES.map(o => t + o));
SUB_HUNDRED[1] = ONE;

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
    }
  } else {
    return false;
  }

  if (!baht && !satang) {
    return 'ศูนย์บาทถ้วน';
  }

  const out = [];

  // Baht
  if (baht < 100) {
    out.push(SUB_HUNDRED[baht]);
  } else {
    const digits: number[] = [];
    Array.from(bahtStr).forEach(s => digits.unshift(+s));
    const millionGroups = Array.from({ length: 1 + digits.length / 6 }, () =>
      digits.splice(0, 6)
    );

    millionGroups.forEach((subMillion, mi) => {
      if (mi) {
        out.unshift('ล้าน');
      }
      subMillion.forEach((d, i) => {
        if (i === 0) {
          const n = d + Number(subMillion[1] || 0) * 10;
          if (n === 1) {
            out.unshift(ED);
          } else {
            out.unshift(SUB_HUNDRED[n]);
          }
        } else if (d && i !== 1) {
          out.unshift(i ? DIGITS[(i - 1) % 6] : '');
          out.unshift(SUB_HUNDRED[d]);
        }
      });
    });
  }

  if (out[0] === ED) {
    out[0] = ONE;
  }

  if (satang) {
    if (baht) out.push('บาท');
    out.push(SUB_HUNDRED[satang]);
    out.push('สตางค์');
  } else {
    out.push('บาทถ้วน');
  }

  if (isNegative) {
    out.unshift('ลบ');
  }

  return out.join('');
}
