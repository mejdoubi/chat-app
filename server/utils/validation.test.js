const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  if('should reject non-string values', () => {
    var res = isRealString(123);
    expect(res).toBe(false);
  });

  if('should string with only spaces', () => {
    var res = isRealString('   ');
    expect(res).toBe(false);
  });

  if('should allow string with non-space characters', () => {
    var res = isRealString(' othman ');
    expect(res).toBe(true);
  });
});
