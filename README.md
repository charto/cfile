cfile
=====

[![build status](https://travis-ci.org/charto/cfile.svg?branch=master)](http://travis-ci.org/charto/cfile)
[![npm version](https://img.shields.io/npm/v/cfile.svg)](https://www.npmjs.com/package/cfile)

This is an experimental container similar to [vinyl](https://github.com/gulpjs/vinyl)
as used in [Gulp.js](http://gulpjs.com/), but without depending on Node.js libraries.
It's intended for more general use besides build tools.
For example, a web server or browser can transform data on the fly.

Differences from `vinyl`:

- No external dependencies.
- Can contain data types relevant to browsers: `XMLHttpRequest` result, `Uint8Array` and `string` (in addition to Node.js `ReadableStream` and `Buffer`).
- Locations are URI instead of paths. Files can represent remotely fetched content stored in memory or cached content under an abstract URN key (in addition to local `file://` paths).
- Files optionally point to other related files, such as source maps.
- Written in [TypeScript](http://www.typescriptlang.org/).

License
=======

[The MIT License](https://raw.githubusercontent.com/charto/cfile/master/LICENSE)

Copyright (c) 2016 BusFaster Ltd
