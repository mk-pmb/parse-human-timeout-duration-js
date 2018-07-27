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
  var phtd = require('parse-human-timeout-duration');

  equal(phtd('2.5 minutes'), 150);
  equal(phtd('2.5 minutes', { unit: 'ms' }), 150e3);
  throws(phtd, ['0.2 sec', { min: 1 }],
    /Timespan must be at least 1 sec/);
  throws(phtd, ['0.2 sec', { min: 500, unit: 'ms' }],
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
  // #ENDOF# usage demo
}());









console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
