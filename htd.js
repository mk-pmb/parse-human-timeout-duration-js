/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, parseHumanDuration = require('timestring-notsep'),
  maxJsTimeoutSec = (Math.pow(2, 31) - 1) / 1e3;

function ptdCore(dura, opt, fx) {
  if (dura === undefined) { dura = opt.undef; }
  if (dura === 'max') { return maxJsTimeoutSec; }
  if (dura === 'off') { dura = false; }
  if (dura === 'never') { dura = false; }
  if (dura === false) {
    if (opt.optional) { return false; }
    fx.fail(Error, 'Timespan required');
  }
  var sec, unit = (opt.unit || 'sec'), min = (+opt.min || 0);
  try {
    sec = parseHumanDuration(dura);
  } catch (badDura) {
    badDura.message = fx.errPfx + badDura.message;
    throw badDura;
  }
  if (sec <= 0) {
    fx.fail(RangeError, 'Timespan must be positive' +
      (opt.optional ? ', or "false" to disable' : ''));
  }
  if (sec > maxJsTimeoutSec) {
    fx.fail(RangeError, 'Timespan too long for a JS timeout: ' + dura);
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
    fx.fail(Error, 'Unsupported output time unit: ' + unit);
  }
  if (sec < min) {
    fx.fail(RangeError, 'Timespan must be at least ' + min + ' ' + unit);
  }
  return sec;
}

EX = function parseHumanTimeoutDuration(dura, opt) {
  if (!opt) {
    opt = false;
    if (dura && (typeof dura === 'object')) {
      opt = dura;
      dura = opt[opt.lookup ? 'key' : 'duration'];
    }
  }
  var descr = opt.descr, dict = opt.lookup, errPfx;
  if (dict) {
    if (!descr) { descr = dura; } else { descr += ' [' + dura + ']'; }
    dura = dict[dura];
  }
  errPfx = (descr ? descr + ': ' : '');
  function fail(ErrCls, msg) { throw new ErrCls(errPfx + msg); }
  return ptdCore(dura, opt, {
    fail: fail,
    errPfx: errPfx,
  });
};

EX.maxJsTimeoutSec = maxJsTimeoutSec;

module.exports = EX;
