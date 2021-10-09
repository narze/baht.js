import { convert } from '../src';

describe('convert', () => {
  it('works', () => {
    expect(convert(1)).toEqual("หนึ่งบาทถ้วน");
  });

  it('should be a function', () => {
    expect(convert).toEqual(expect.any(Function));
  });

  it('should not convert very small amount', () => {
    expect(convert(0.0001)).toEqual('');
    expect(convert(0.001)).toEqual('');
    expect(convert(0.009)).toEqual('');
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

  it('should convert big number to Baht', () => {
    expect(convert(1000000)).toEqual('หนึ่งล้านบาทถ้วน');
    expect(convert(1000001)).toEqual('หนึ่งล้านเอ็ดบาทถ้วน');
    expect(convert(11000001)).toEqual('สิบเอ็ดล้านเอ็ดบาทถ้วน');
    expect(convert(11000000)).toEqual('สิบเอ็ดล้านบาทถ้วน');
  });

  it('should convert multiple million round to Baht', () => {
    expect(convert(1000000000000000000)).toEqual('หนึ่งล้านล้านล้านบาทถ้วน');
    expect(convert(1000000000001)).toEqual('หนึ่งล้านล้านเอ็ดบาทถ้วน');
    expect(convert(1000000000000)).toEqual('หนึ่งล้านล้านบาทถ้วน');
    expect(convert(1001000000001)).toEqual('หนึ่งล้านหนึ่งพันล้านเอ็ดบาทถ้วน');
    expect(convert(1001000001001)).toEqual(
      'หนึ่งล้านหนึ่งพันล้านหนึ่งพันเอ็ดบาทถ้วน',
    );
    expect(convert(1001000000000)).toEqual('หนึ่งล้านหนึ่งพันล้านบาทถ้วน');
    expect(convert(1000000000)).toEqual('หนึ่งพันล้านบาทถ้วน');
    expect(convert(10000000)).toEqual('สิบล้านบาทถ้วน');
    expect(convert(100000000)).toEqual('หนึ่งร้อยล้านบาทถ้วน');
  });

  it('should convert complex number to Baht', () => {
    expect(convert(6321298)).toEqual(
      'หกล้านสามแสนสองหมื่นหนึ่งพันสองร้อยเก้าสิบแปดบาทถ้วน',
    );
    expect(convert(10034567)).toEqual(
      'สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน',
    );
    expect(convert(20034567)).toEqual(
      'ยี่สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน',
    );
    expect(convert(30034567.0)).toEqual(
      'สามสิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน',
    );
  });

  it('should convert number to Baht with Satang', () => {
    expect(convert(11.25)).toEqual('สิบเอ็ดบาทยี่สิบห้าสตางค์');
    expect(convert(100.5)).toEqual('หนึ่งร้อยบาทห้าสิบสตางค์');
    expect(convert(567.01)).toEqual('ห้าร้อยหกสิบเจ็ดบาทหนึ่งสตางค์');
    expect(convert(123456789.999)).toEqual(
      'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์',
    );
  });
});
