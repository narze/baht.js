import { convert } from '../src';
import { convert as bahtLatest } from 'baht';
const { ThaiBaht: thaiBahtText } = require('thai-baht-text-ts');

describe('convert', () => {
  it('works', () => {
    expect(convert(0)).toBe('ศูนย์บาทถ้วน');
    expect(convert(1)).toBe('หนึ่งบาทถ้วน');
    expect(convert(2)).toBe('สองบาทถ้วน');
    expect(convert(5)).toBe('ห้าบาทถ้วน');
    expect(convert(9)).toBe('เก้าบาทถ้วน');

    expect(convert(10)).toBe('สิบบาทถ้วน');
    expect(convert(20)).toBe('ยี่สิบบาทถ้วน');

    expect(convert(30)).toBe('สามสิบบาทถ้วน');
    expect(convert(45)).toBe('สี่สิบห้าบาทถ้วน');

    expect(convert(100)).toBe('หนึ่งร้อยบาทถ้วน');
    expect(convert(122)).toBe('หนึ่งร้อยยี่สิบสองบาทถ้วน');
    expect(convert(190)).toBe('หนึ่งร้อยเก้าสิบบาทถ้วน');

    expect(convert(290)).toBe('สองร้อยเก้าสิบบาทถ้วน');

    expect(convert(1000)).toBe('หนึ่งพันบาทถ้วน');
    expect(convert(10000)).toBe('หนึ่งหมื่นบาทถ้วน');
    expect(convert(100000)).toBe('หนึ่งแสนบาทถ้วน');
    expect(convert(100001)).toBe('หนึ่งแสนเอ็ดบาทถ้วน');
    expect(convert(100005)).toBe('หนึ่งแสนห้าบาทถ้วน');
    expect(convert(100021)).toBe('หนึ่งแสนยี่สิบเอ็ดบาทถ้วน');

    expect(convert(1000000)).toBe('หนึ่งล้านบาทถ้วน');
    expect(convert(1002000)).toBe('หนึ่งล้านสองพันบาทถ้วน');

    expect(convert(10000000)).toBe('สิบล้านบาทถ้วน');
    expect(convert(10002000)).toBe('สิบล้านสองพันบาทถ้วน');
  });

  it('returns false for bad inputs', () => {
    expect(convert('hello')).toBe(false);
    expect(convert((false as unknown) as number)).toBe(false);
    expect(convert((true as unknown) as number)).toBe(false);
    expect(convert(({} as unknown) as number)).toBe(false);
    expect(convert(([] as unknown) as number)).toBe(false);
  });

  it('should not returns undefined string included within results when use scientific notation', () => {
    expect(convert('1e+3')).not.toContain('undefined');
    expect(convert('1e+3')).not.toContain('undefined');
    expect(convert('1.2e+3')).not.toContain('undefined');
    expect(convert('-1.2e+3')).not.toContain('undefined');
    expect(convert('1e-2')).not.toContain('undefined');
    expect(convert('1.2e-1')).not.toContain('undefined');
    expect(convert('-1.2e-1')).not.toContain('undefined');
  });

  it('should be a function', () => {
    expect(convert).toEqual(expect.any(Function));
  });

  it('convert to 0', () => {
    expect(convert(0)).toEqual('ศูนย์บาทถ้วน');
    expect(convert(0.0)).toEqual('ศูนย์บาทถ้วน');
    expect(convert(0.0001)).toEqual('ศูนย์บาทถ้วน');
    expect(convert(0.001)).toEqual('ศูนย์บาทถ้วน');
    expect(convert(0.009)).toEqual('ศูนย์บาทถ้วน');
  });

  it('should convert to Satang', () => {
    expect(convert(0.01)).toEqual('หนึ่งสตางค์');
    expect(convert(0.1)).toEqual('สิบสตางค์');
    expect(convert(0.1)).toEqual('สิบสตางค์');
    expect(convert(0.11)).toEqual('สิบเอ็ดสตางค์');
    expect(convert(0.12)).toEqual('สิบสองสตางค์');
    expect(convert(0.123)).toEqual('สิบสองสตางค์');
    expect(convert(0.2)).toEqual('ยี่สิบสตางค์');
    expect(convert(0.2)).toEqual('ยี่สิบสตางค์');
    expect(convert(0.21)).toEqual('ยี่สิบเอ็ดสตางค์');
    expect(convert(0.25)).toEqual('ยี่สิบห้าสตางค์');
    expect(convert(0.255)).toEqual('ยี่สิบห้าสตางค์');
    expect(convert(0.5)).toEqual('ห้าสิบสตางค์');
    expect(convert(0.75)).toEqual('เจ็ดสิบห้าสตางค์');
    expect(convert(0.99)).toEqual('เก้าสิบเก้าสตางค์');
    expect(convert(0.999)).toEqual('เก้าสิบเก้าสตางค์');
  });

  it('should convert to Baht', () => {
    expect(convert(1)).toEqual('หนึ่งบาทถ้วน');
    expect(convert(10)).toEqual('สิบบาทถ้วน');
    expect(convert(11)).toEqual('สิบเอ็ดบาทถ้วน');
    expect(convert(12)).toEqual('สิบสองบาทถ้วน');
    expect(convert(20)).toEqual('ยี่สิบบาทถ้วน');
    expect(convert(21)).toEqual('ยี่สิบเอ็ดบาทถ้วน');
    expect(convert(22)).toEqual('ยี่สิบสองบาทถ้วน');
    expect(convert(100)).toEqual('หนึ่งร้อยบาทถ้วน');
    expect(convert(101)).toEqual('หนึ่งร้อยเอ็ดบาทถ้วน');
    expect(convert(111)).toEqual('หนึ่งร้อยสิบเอ็ดบาทถ้วน');
    expect(convert(121)).toEqual('หนึ่งร้อยยี่สิบเอ็ดบาทถ้วน');
  });

  it('should convert to negative baht', () => {
    expect(convert(-1)).toEqual('ลบหนึ่งบาทถ้วน');
    expect(convert(-10)).toEqual('ลบสิบบาทถ้วน');
    expect(convert(-11)).toEqual('ลบสิบเอ็ดบาทถ้วน');
    expect(convert(-12)).toEqual('ลบสิบสองบาทถ้วน');
    expect(convert(-20)).toEqual('ลบยี่สิบบาทถ้วน');
    expect(convert(-21)).toEqual('ลบยี่สิบเอ็ดบาทถ้วน');
    expect(convert(-22)).toEqual('ลบยี่สิบสองบาทถ้วน');
    expect(convert(-100)).toEqual('ลบหนึ่งร้อยบาทถ้วน');
    expect(convert(-101)).toEqual('ลบหนึ่งร้อยเอ็ดบาทถ้วน');
    expect(convert(-111)).toEqual('ลบหนึ่งร้อยสิบเอ็ดบาทถ้วน');
    expect(convert(-121)).toEqual('ลบหนึ่งร้อยยี่สิบเอ็ดบาทถ้วน');
  });

  it('should convert big number to Baht', () => {
    expect(convert(1000000)).toEqual('หนึ่งล้านบาทถ้วน');
    expect(convert(1000001)).toEqual('หนึ่งล้านเอ็ดบาทถ้วน');
    expect(convert(11000001)).toEqual('สิบเอ็ดล้านเอ็ดบาทถ้วน');
    expect(convert(11000000)).toEqual('สิบเอ็ดล้านบาทถ้วน');
    expect(convert(21000000)).toEqual('ยี่สิบเอ็ดล้านบาทถ้วน');
    expect(convert(21000010)).toEqual('ยี่สิบเอ็ดล้านสิบบาทถ้วน');
    expect(convert(21000011)).toEqual('ยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน');
    expect(convert(121000011)).toEqual('หนึ่งร้อยยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน');
  });

  it('should convert multiple million round to Baht', () => {
    expect(convert(1000000000000000000)).toEqual('หนึ่งล้านล้านล้านบาทถ้วน');
    expect(convert(1000000000001)).toEqual('หนึ่งล้านล้านเอ็ดบาทถ้วน');
    expect(convert(1000000000000)).toEqual('หนึ่งล้านล้านบาทถ้วน');
    expect(convert(1001000000001)).toEqual('หนึ่งล้านหนึ่งพันล้านเอ็ดบาทถ้วน');
    expect(convert(1001000001001)).toEqual(
      'หนึ่งล้านหนึ่งพันล้านหนึ่งพันเอ็ดบาทถ้วน'
    );
    expect(convert(1001000000000)).toEqual('หนึ่งล้านหนึ่งพันล้านบาทถ้วน');
    expect(convert(1000000000)).toEqual('หนึ่งพันล้านบาทถ้วน');
    expect(convert(10000000)).toEqual('สิบล้านบาทถ้วน');
    expect(convert(100000000)).toEqual('หนึ่งร้อยล้านบาทถ้วน');

    // Safe integer
    expect(convert(9007199254740991)).toEqual(
      'เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบเอ็ดบาทถ้วน'
    );
  });

  it('should convert complex number to Baht', () => {
    expect(convert(6321298)).toEqual(
      'หกล้านสามแสนสองหมื่นหนึ่งพันสองร้อยเก้าสิบแปดบาทถ้วน'
    );
    expect(convert(10034567)).toEqual(
      'สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
    expect(convert(20034567)).toEqual(
      'ยี่สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
    expect(convert(30034567.0)).toEqual(
      'สามสิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
  });

  it('should convert number to Baht with Satang', () => {
    expect(convert(11.25)).toEqual('สิบเอ็ดบาทยี่สิบห้าสตางค์');
    expect(convert(100.5)).toEqual('หนึ่งร้อยบาทห้าสิบสตางค์');
    expect(convert(567.01)).toEqual('ห้าร้อยหกสิบเจ็ดบาทหนึ่งสตางค์');
    expect(convert(123456789.999)).toEqual(
      'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
    );
  });

  it('should convert number in string format', () => {
    expect(convert(('1234' as unknown) as number)).toBe(
      'หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน'
    );
    expect(convert(('-1' as unknown) as number)).toBe('ลบหนึ่งบาทถ้วน');
    expect(convert(('-30' as unknown) as number)).toBe('ลบสามสิบบาทถ้วน');
    expect(convert(('123456789.999' as unknown) as number)).toEqual(
      'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
    );
    expect(convert(('4123001998830750501' as unknown) as number)).toBe(
      'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
    );
    expect(convert(('-4123001998830750501' as unknown) as number)).toBe(
      'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
    );
    expect(convert(('-4123001998830750501.21' as unknown) as number)).toBe(
      'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทยี่สิบเอ็ดสตางค์'
    );
    expect(convert(('-1654321.21' as unknown) as number)).toBe(
      'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
    );
  });

  it('should convert looping string numbers correctly', () => {
    for (let i = 100; i >= 0; i--) {
      const loopingNumber = Array(i)
        .fill('654321028761')
        .join('');

      const loopingText = Array(i)
        .fill(
          'ล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดล้านสองหมื่นแปดพันเจ็ดร้อยหกสิบเอ็ด'
        )
        .join('');

      expect(
        convert((`-1${loopingNumber}.21${555555}` as unknown) as number)
      ).toBe(`ลบหนึ่ง${loopingText}บาทยี่สิบเอ็ดสตางค์`);
    }
  });

  // it('equals to value from other library (STRESS TEST)', () => {
  //   for (let i = 1; i < 20000000; i += 1) {
  //     expect(convert(i)).toEqual(bahtLatest(i));
  //     expect(convert(i)).toEqual(thaiBahtText(i));
  //   }
  // });
});
