const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  if('should generate the correct message object', () => {
    var from = 'othman';
    var text = 'hello othman';
    var res = generateMessage(from, text);
    expect(res).toMatchObject({
      from,
      text
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
