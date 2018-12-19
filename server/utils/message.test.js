const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'othman';
    var latitude = 69;
    var longitude = 96;
    var url = 'https://www.google.com/maps?q=69,96';
    var res = generateLocationMessage(from, latitude, longitude);
    expect(res).toMatchObject({
      from,
      url
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
