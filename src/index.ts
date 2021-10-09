const DIGITS = ['สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

const SUB_HUNDRED = [
  '',
  'หนึ่ง',
  'สอง',
  'สาม',
  'สี่',
  'ห้า',
  'หก',
  'เจ็ด',
  'แปด',
  'เก้า',
  'สิบ',
  'สิบเอ็ด',
  'สิบสอง',
  'สิบสาม',
  'สิบสี่',
  'สิบห้า',
  'สิบหก',
  'สิบเจ็ด',
  'สิบแปด',
  'สิบเก้า',
  'ยี่สิบ',
  'ยี่สิบเอ็ด',
  'ยี่สิบสอง',
  'ยี่สิบสาม',
  'ยี่สิบสี่',
  'ยี่สิบห้า',
  'ยี่สิบหก',
  'ยี่สิบเจ็ด',
  'ยี่สิบแปด',
  'ยี่สิบเก้า',
  'สามสิบ',
  'สามสิบเอ็ด',
  'สามสิบสอง',
  'สามสิบสาม',
  'สามสิบสี่',
  'สามสิบห้า',
  'สามสิบหก',
  'สามสิบเจ็ด',
  'สามสิบแปด',
  'สามสิบเก้า',
  'สี่สิบ',
  'สี่สิบเอ็ด',
  'สี่สิบสอง',
  'สี่สิบสาม',
  'สี่สิบสี่',
  'สี่สิบห้า',
  'สี่สิบหก',
  'สี่สิบเจ็ด',
  'สี่สิบแปด',
  'สี่สิบเก้า',
  'ห้าสิบ',
  'ห้าสิบเอ็ด',
  'ห้าสิบสอง',
  'ห้าสิบสาม',
  'ห้าสิบสี่',
  'ห้าสิบห้า',
  'ห้าสิบหก',
  'ห้าสิบเจ็ด',
  'ห้าสิบแปด',
  'ห้าสิบเก้า',
  'หกสิบ',
  'หกสิบเอ็ด',
  'หกสิบสอง',
  'หกสิบสาม',
  'หกสิบสี่',
  'หกสิบห้า',
  'หกสิบหก',
  'หกสิบเจ็ด',
  'หกสิบแปด',
  'หกสิบเก้า',
  'เจ็ดสิบ',
  'เจ็ดสิบเอ็ด',
  'เจ็ดสิบสอง',
  'เจ็ดสิบสาม',
  'เจ็ดสิบสี่',
  'เจ็ดสิบห้า',
  'เจ็ดสิบหก',
  'เจ็ดสิบเจ็ด',
  'เจ็ดสิบแปด',
  'เจ็ดสิบเก้า',
  'แปดสิบ',
  'แปดสิบเอ็ด',
  'แปดสิบสอง',
  'แปดสิบสาม',
  'แปดสิบสี่',
  'แปดสิบห้า',
  'แปดสิบหก',
  'แปดสิบเจ็ด',
  'แปดสิบแปด',
  'แปดสิบเก้า',
  'เก้าสิบ',
  'เก้าสิบเอ็ด',
  'เก้าสิบสอง',
  'เก้าสิบสาม',
  'เก้าสิบสี่',
  'เก้าสิบห้า',
  'เก้าสิบหก',
  'เก้าสิบเจ็ด',
  'เก้าสิบแปด',
  'เก้าสิบเก้า',
];

export function convert(input: number): string | boolean {
  if (typeof input !== 'number') {
    return false;
  }

  const out = [];
  let isNegative = false;

  if (input < 0) {
    isNegative = true;
    input = -input;
  }

  const baht = Math.floor(input);
  const satangs = Number.isInteger(input) ? 0 : Math.floor((input * 100) % 100);

  if (!baht && !satangs) {
    return 'ศูนย์บาทถ้วน';
  }

  // Baht
  if (baht < 100) {
    out.push(SUB_HUNDRED[baht]);
  } else {
    const digits: number[] = [];
    Array.from(baht.toString()).forEach(s => digits.unshift(+s));
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
            out.unshift('เอ็ด');
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

  if (out[0] === 'เอ็ด') {
    out[0] = 'หนึ่ง';
  }

  if (satangs) {
    if (baht) out.push('บาท');
    out.push(SUB_HUNDRED[satangs]);
    out.push('สตางค์');
  } else {
    out.push('บาทถ้วน');
  }

  if (isNegative) {
    out.unshift('ลบ');
  }

  return out.join('');
}
