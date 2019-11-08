/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function readmeDemo(t) {
  // #BEGIN# usage demo
  var phtd = require('parse-human-timeout-duration'),
    timeouts = { read: '0.2 sec' };

  t.equal(phtd('2.5 minutes'), 150);
  t.equal(phtd('2.5 minutes', { unit: 'ms' }), 150e3);
  t.throws(phtd, [timeouts.read, { min: 1 }],
    /Timespan must be at least 1 sec/);
  t.throws(phtd, [timeouts.read, { min: 500, unit: 'ms' }],
    /Timespan must be at least 500 ms/);
  t.throws(phtd, ['1 year'], /^RangeError: Timespan too long/);
  t.throws(phtd, ['0 sec'], /Timespan must be positive$/);
  t.throws(phtd, ['0 sec', { optional: true }],
    /Timespan must be positive, or "false" to disable/);
  t.throws(phtd, [false], /Timespan required/);
  t.equal(phtd(false, { optional: true }), false);
  t.throws(phtd, ['false'], /Invalid duration: Found no number/);
  t.throws(phtd, ['false', { optional: true }],
    /Invalid duration: Found no number/);

  t.throws(phtd, ['never'], /Timespan required/);
  t.equal(phtd('never', { optional: true }), false);
  t.equal(phtd('off', { optional: true }), false);

  t.throws(phtd, ['0 ms', { descr: 'database timeout' }],
    /RangeError: database timeout: Timespan must be positive/);

  t.equal(phtd('read', { lookup: timeouts }), 0.2);
  t.throws(phtd, ['write', { lookup: timeouts }],
    /InvalidDuration: write: Invalid duration: Found no time unit/);
  t.throws(phtd, ['write', { lookup: timeouts, descr: 'database config' }],
    /InvalidDuration: database config \[write\]: Invalid/);

  t.equal(phtd({ duration: '2.5 minutes' }), 150);
  t.throws(phtd, [{ key: '2.5 minutes' }], /no time unit/);
  t.equal(phtd({ key: 'read', lookup: timeouts }), 0.2);
  t.throws(phtd, [{ duration: 'read', lookup: timeouts }], /no time unit/);
  // #ENDOF# usage demo
}



(function () {
  var ass = require('assert'), t = { equal: ass.strictEqual };
  t.throws = function throws(f, a, e) {
    function g() { f.apply(null, a); }
    ass.throws(g, e);
  };
  readmeDemo(t);
}());





console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
