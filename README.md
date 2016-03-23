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

API
===

>
> <a name="api-Address"></a>
> ### [`Address`](#api-Address)
> Simple absolute URI container and resolver.  
> > **new( )** <sup>&rArr; <code>[Address](#api-Address)</code></sup>  
> > &emsp;&#x25aa; uri <sup><code>string</code></sup>  
> > &emsp;&#x25aa; base <sup><code>[Address](#api-Address)</code></sup>  
> > **.resolve( )** <sup>&rArr; <code>[Address](#api-Address)</code></sup>  
> > &emsp;Resolve another URI relative to this address.  
> > &emsp;&#x25aa; uri <sup><code>string</code></sup>  
> > **.format( )** <sup>&rArr; <code>string</code></sup>  
> > &emsp;Convert to URI string.  
> > **protocol** <sup><code>string</code></sup>  
> > &emsp;Protocol including trailing colon, eg. http: or urn:  
> > **partList** <sup><code>string[]</code></sup>  
> > &emsp;URL split by slashes without query or hash, or URN split by colons.  
> > **paramList** <sup><code>string[]</code></sup>  
> > &emsp;Query parameters in the form a=b.  
>
> <a name="api-File"></a>
> ### [`File`](#api-File)
> Represents a remote or local file and its contents (stream or buffer).  
> > **new( )** <sup>&rArr; <code>[File](#api-File)</code></sup>  
> > &emsp;&#x25aa; uri <sup><code>string | [Address](#api-Address)</code></sup>  
> > **baseAddress** <sup><code>[Address](#api-Address)</code></sup>  
> > &emsp;Where the file thinks it is, and the base of any relative paths inside it.  
> > **address** <sup><code>[Address](#api-Address)</code></sup>  
> > &emsp;Current guess of file location. Changes until all possible redirects
are resolved (possibly to a file in disk cache).  
> > **history** <sup><code>[Address](#api-Address)[]</code></sup>  
> > &emsp;List of earlier addresses such as resolved HTTP redirects.  
> > **related** <sup><code>RelatedFiles</code></sup>  
> > &emsp;Related files, such as a source map.  
> > **contents** <sup><code>FileContents</code></sup>  
> > &emsp;String, Uint8Array, XMLHttpRequest, HTTP headers, Node.js stream and/or buffer.  

License
=======

[The MIT License](https://raw.githubusercontent.com/charto/cfile/master/LICENSE)

Copyright (c) 2016 BusFaster Ltd
