
<!--#echo json="package.json" key="name" underline="=" -->
parse-human-timeout-duration
============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Basically timestring-notsep but checks the range limits for valid JS
setTimeout() timespans.
<!--/#echo -->



API
---

This module exports one function:

### parseHumanTimeoutDuration(dura[, opts])

Takes a human-readable timespan `dura`.
Returns `false` (see below) or a number (see below).

`opts` is an optional options object that supports these keys:

* `optional`: If true and `dura` is one of the non-durations
  `false`, `'never'` or `'off'`, return `false` instead of complaining.
* `unit`: Desired unit of measurement for the result number.
  Can be `'sec'` (default) or `'ms'`.
* `min`: Complain if the result would be less than this. Defaults to `0`.


Usage
-----

from [usage.js](usage.js):

<!--#include file="usage.js" outdent="  " code="javascript"
  start="  // #BEGIN# usage demo" stop="  // #ENDOF# usage demo" -->
<!--#verbatim lncnt="23" -->
```javascript
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
```
<!--/include-->



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
