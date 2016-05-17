'use strict';

var fs = require('fs');
var path = require('path');

var fileread = function () {
  var filepath = path.resolve.apply(null, arguments);
  return fs.readFileSync(filepath, 'utf8');
};

module.exports = fileread;
