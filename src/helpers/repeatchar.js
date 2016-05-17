'use strict';

var repeatchar = function (char, times) {
  var str = '';
  for (var i = 0; i < times; i++) { str += char; }
  return str;
};

module.exports = repeatchar;
