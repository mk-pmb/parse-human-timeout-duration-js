/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, parseHumanDuration = require('timestring-notsep'),
  maxJsTimeoutSec = (Math.pow(2, 31) - 1) / 1e3;

EX = function parseHumanTimeoutDuration(dura, opt) {
  if (!opt) { opt = false; }
  if (dura === 'max') { return maxJsTimeoutSec; }
  if (dura === 'off') { dura = false; }
  if (dura === 'never') { dura = false; }
  if (dura === false) {
    if (opt.optional) { return false; }
    throw new Error('Timespan required');
  }
  var sec = parseHumanDuration(dura), unit = (opt.unit || 'sec'),
    min = (+opt.min || 0);
  if (sec <= 0) {
    throw new RangeError('Timespan must be positive' +
      (opt.optional ? ', or "false" to disable' : ''));
  }
  if (sec > maxJsTimeoutSec) {
    throw new RangeError('Timespan too long for a JS timeout: ' + dura);
  }
  switch (unit) {
  case 's':
  case 'sec':
    break;
  case 'ms':
  case 'msec':
    sec *= 1e3;
    break;
  default:
    throw new Error('Unsupported output time unit: ' + unit);
  }
  if (sec < min) {
    throw new RangeError('Timespan must be at least ' + min + ' ' + unit);
  }
  return sec;
};

EX.maxJsTimeoutSec = maxJsTimeoutSec;

module.exports = EX;
