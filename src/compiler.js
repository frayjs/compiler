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

var root = function (children) {
  return {
    type: 'ElementNode',
    name: 'div',
    attrs: {},
    children: children
  };
};

var compiler = function (ast, indent) {
  indent = indent || 2;

  if (ast.type === 'TextNode') {
    return '\'' + ast.value + '\'';
  }

  if (ast.type === 'ExpressionNode') {
    return 'state.' + ast.value.join('.');
  }

  if (ast.type === 'ElementNode') {
    return 'h(' + [
      '\'' + ast.name + '\'',
      object(ast.attrs),
      array(ast.children.map(function (child) {
        return compiler(child, indent + 2);
      }), indent)
    ].join(', ') + ')';
  }

  if (ast.type === 'Root') {
    return header + compiler(root(ast.children)) + footer;
  }
};

module.exports = compiler;
