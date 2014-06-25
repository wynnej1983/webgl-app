'use strict';

var inherits = require('inherits');

Function.prototype.inherits = function (superclass) {
  inherits(this, superclass);
  return this;
};

function log(data) {
  console.log(data);
}

module.exports.log = log;
