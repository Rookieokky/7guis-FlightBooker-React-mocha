import expect from 'expect';
import {DATE_SEPARATOR, toShortDate, fromShortDate} from '../src/dateUtils';

describe("Date utils", ()=>{

  describe("toShortDate", ()=>{
    it('should return a short representation of a date', ()=>{
      const d = new Date(2015,11,31);
      expect(toShortDate(d)).toBe(['31','12','2015'].join(DATE_SEPARATOR));
    });
    it('should pad with leading zeros when month or day are less than 10', ()=>{
      const d = new Date(2016,0,1);
      expect(toShortDate(d)).toBe(['01','01','2016'].join(DATE_SEPARATOR));
    });
  });

  describe("fromShortDate", ()=>{
    it('should convert the short date string to a Date object', ()=>{
      expect(fromShortDate(['25','12','2015'].join(DATE_SEPARATOR))).toEqual(new Date(2015,11,25));
    });
    it('should return null when an invalid date string is provided', ()=>{
      expect(fromShortDate('abc')).toEqual(null);
    });
    it('should return null when date year is less than 1000', ()=>{
      expect(fromShortDate('01.01.999')).toEqual(null);
    });
    it('should return null when date day is more than 31', ()=>{
      expect(fromShortDate('32.01.2016')).toEqual(null);
    });
    it('should return null when date month is more than 12', ()=>{
      expect(fromShortDate('31.13.2016')).toEqual(null);
    });
    it('should return null when an empty string is provided', ()=>{
      expect(fromShortDate('')).toEqual(null);
    });
  });

});
