const DIGITS = [
  'สิบ',
  'ร้อย',
  'พัน',
  'หมื่น',
  'แสน',
  'ล้าน']
const SUB_HUNDRED =
  ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ", "สิบเอ็ด", "สิบสอง", "สิบสาม", "สิบสี่", "สิบห้า", "สิบหก", "สิบเจ็ด", "สิบแปด", "สิบเก้า", "ยี่สิบ", "ยี่สิบเอ็ด", "ยี่สิบสอง", "ยี่สิบสาม", "ยี่สิบสี่", "ยี่สิบห้า", "ยี่สิบหก", "ยี่สิบเจ็ด", "ยี่สิบแปด", "ยี่สิบเก้า", "สามสิบ", "สามสิบเอ็ด", "สามสิบสอง", "สามสิบสาม", "สามสิบสี่", "สามสิบห้า", "สามสิบหก", "สามสิบเจ็ด", "สามสิบแปด", "สามสิบเก้า", "สี่สิบ", "สี่สิบเอ็ด", "สี่สิบสอง", "สี่สิบสาม", "สี่สิบสี่", "สี่สิบห้า", "สี่สิบหก", "สี่สิบเจ็ด", "สี่สิบแปด", "สี่สิบเก้า", "ห้าสิบ", "ห้าสิบเอ็ด", "ห้าสิบสอง", "ห้าสิบสาม", "ห้าสิบสี่", "ห้าสิบห้า", "ห้าสิบหก", "ห้าสิบเจ็ด", "ห้าสิบแปด", "ห้าสิบเก้า", "หกสิบ", "หกสิบเอ็ด", "หกสิบสอง", "หกสิบสาม", "หกสิบสี่", "หกสิบห้า", "หกสิบหก", "หกสิบเจ็ด", "หกสิบแปด", "หกสิบเก้า", "เจ็ดสิบ", "เจ็ดสิบเอ็ด", "เจ็ดสิบสอง", "เจ็ดสิบสาม", "เจ็ดสิบสี่", "เจ็ดสิบห้า", "เจ็ดสิบหก", "เจ็ดสิบเจ็ด", "เจ็ดสิบแปด", "เจ็ดสิบเก้า", "แปดสิบ", "แปดสิบเอ็ด", "แปดสิบสอง", "แปดสิบสาม", "แปดสิบสี่", "แปดสิบห้า", "แปดสิบหก", "แปดสิบเจ็ด", "แปดสิบแปด", "แปดสิบเก้า", "เก้าสิบ", "เก้าสิบเอ็ด", "เก้าสิบสอง", "เก้าสิบสาม", "เก้าสิบสี่", "เก้าสิบห้า", "เก้าสิบหก", "เก้าสิบเจ็ด", "เก้าสิบแปด", "เก้าสิบเก้า"]

const SUB_TEN = SUB_HUNDRED.slice(0, 10)

// function digitsToWords(digits: number[]): string[] {
//   const words: string[] = []
//   digits.forEach((d, i) => {
//     if (d) {
//       words.push(i ? DIGITS[(i - 1) % 6] : "")
//       words.push(SUB_TEN[d])
//     }
//   })

//   return words
// }

export function convert(input: number): string {
  let out = []
  const baht = Math.floor(input)
  const satangs = Math.floor(input * 100 % 100)

  if (!baht && !satangs) { return "" }
  // input = Math.round(input)
  // baht = input.truncate

  // if input == 0
  //   return 'ศูนย์บาทถ้วน'
  // end

  // if input < 0
  //   out << "ลบ"
  //   baht = -baht
  //   input = -input
  // end

  // Baht
  if (baht < 100) {
    out.push(SUB_HUNDRED[baht])
  } else {
    const digits: number[] = []
    Array.from(baht.toString()).forEach(s => digits.unshift(+s))
    const millionGroups = Array.from({ length: 1 + digits.length / 6 }, () => digits.splice(0, 6));

    millionGroups.forEach((dd, mi) => {
      if (mi) {
        out.unshift("ล้าน")
      }
      dd.forEach((d, i) => {
        if (d) {
          out.unshift(i ? DIGITS[(i - 1) % 6] : "")
          out.unshift(SUB_TEN[d])
        }
      })
    })
  }

  // Satangs
  if (satangs) {
    if (baht) out.push("บาท")
    out.push(SUB_HUNDRED[satangs])
    out.push("สตางค์")
  } else {
    out.push("บาทถ้วน")
  }

  // TODO: Optimize
  return out.join("").replace('หนึ่งสิบ', 'สิบ').replace('สองสิบ', 'ยี่สิบ').replaceAll(/(.+?)หนึ่ง(ล้าน|บาท)/g, "$1เอ็ด$2").replaceAll(/(.+?)หนึ่ง(ล้าน|บาท)/g, "$1เอ็ด$2")
};
