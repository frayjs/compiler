#!/usr/bin/env node
'use strict';

var echo = require('cli/echo');
var cat = require('cli/cat');
var compiler = require('./compiler');

var compile = function (ast) {
  return compiler(JSON.parse(ast));
};

if (!process.stdin.isTTY) {
  echo(compile(cat()));
  return;
}

var args = process.argv.slice(2);
var filepath = args[0];

echo(compile(cat(filepath)));
