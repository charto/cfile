// This file is part of cfile, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {run as runAddress} from './Address';

var testCount = 0;
var errorCount = 0;

var result = runAddress();

testCount += result[0];
errorCount += result[1];

console.log((testCount - errorCount) + ' / ' + testCount + ' tests OK');

if(errorCount) process.exit(1);
