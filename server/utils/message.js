const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from : from.trim(),
    text : text.trim(),
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from.trim(),
    url: `https://www.google.com/maps?q=${latitude},${longitude}`.trim(),
    createdAt: moment().valueOf()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
