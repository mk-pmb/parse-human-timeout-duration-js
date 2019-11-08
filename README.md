
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
* `descr`: Text to annotate error messages with if an error occurrs.
* `lookup`: A dictionary object.
  `dura` is used as the key to look up the real duration.


### parseHumanTimeoutDuration(opts)

If called with an object as first argument, and the second argument is
false-y or missing, the first is used as `opts`.
In this case you have to specify the `dura` as…
  * `opts.key` if `opts.lookup` is used, or
  * `opts.duration` otherwise.





Usage
-----

see [test/usage.js](test/usage.js).




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
