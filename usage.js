/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var assert = require('assert'), equal = assert.strictEqual;

function throws(f, a, e) {
  function g() { f.apply(null, a); }
  assert.throws(g, e);
}

(function readmeDemo() {
  // #BEGIN# usage demo
  var phtd = require('parse-human-timeout-duration'),
    timeouts = { read: '0.2 sec' };

  equal(phtd('2.5 minutes'), 150);
  equal(phtd('2.5 minutes', { unit: 'ms' }), 150e3);
  throws(phtd, [timeouts.read, { min: 1 }],
    /Timespan must be at least 1 sec/);
  throws(phtd, [timeouts.read, { min: 500, unit: 'ms' }],
    /Timespan must be at least 500 ms/);
  throws(phtd, ['1 year'], /^RangeError: Timespan too long/);
  throws(phtd, ['0 sec'], /Timespan must be positive$/);
  throws(phtd, ['0 sec', { optional: true }],
    /Timespan must be positive, or "false" to disable/);
  throws(phtd, [false], /Timespan required/);
  equal(phtd(false, { optional: true }), false);
  throws(phtd, ['false'], /Invalid duration: Found no number/);
  throws(phtd, ['false', { optional: true }],
    /Invalid duration: Found no number/);

  throws(phtd, ['never'], /Timespan required/);
  equal(phtd('never', { optional: true }), false);
  equal(phtd('off', { optional: true }), false);

  throws(phtd, ['0 ms', { descr: 'database timeout' }],
    /RangeError: database timeout: Timespan must be positive/);

  equal(phtd('read', { lookup: timeouts }), 0.2);
  throws(phtd, ['write', { lookup: timeouts }],
    /InvalidDuration: write: Invalid duration: Found no time unit/);
  throws(phtd, ['write', { lookup: timeouts, descr: 'database config' }],
    /InvalidDuration: database config \[write\]: Invalid/);
  // #ENDOF# usage demo
}());









console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
