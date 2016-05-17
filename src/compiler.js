'use strict';

var fileread = require('./helpers/fileread');
var repeatchar = require('./helpers/repeatchar');

var wrapper = fileread(__dirname, 'tpl/h-wrapper.js');
var tokens = wrapper.split('/* hyperscript */');
var header = tokens[0];
var footer = tokens[1];

var object = function (obj) {
  var keys = Object.keys(obj);
  if (!keys.length) { return '{}'; }

  return '{ ' + keys.map(function (key) {
    return key + ': \'' + obj[key] + '\'';
  }).join(', ') + ' }';
};

var array = function (arr, indent) {
  if (!arr.length) { return '[]'; }

  return [
    '[\n' + repeatchar(' ', indent + 2),
    arr.join(',\n' + repeatchar(' ', indent + 2)),
    '\n' + repeatchar(' ', indent) + ']'
  ].join('');
};

var compiler = function (ast, indent) {
  indent = indent || 2;

  if (ast.type === 'text') {
    return '\'' + ast.value + '\'';
  }

  if (ast.type === 'expr') {
    return 'state.' + ast.value;
  }

  if (ast.type === 'tag') {
    return 'h(' + [
      '\'' + ast.name + '\'',
      object(ast.attrs),
      array(ast.children.filter(function(child) {
        return !(child.type === 'text' && child.value === ' ');
      }).map(function (child) {
        return compiler(child, indent + 2);
      }), indent)
    ].join(', ') + ')';
  }

  if (ast.type === 'component') {
    return header + compiler(ast.root) + footer;
  }
};

module.exports = compiler;
