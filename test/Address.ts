// This file is part of cfile, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {Address} from 'cfile';

function testConstructor(input: string, wanted: string) {
	var testCount = 0;
	var errorCount = 0;

	var output = new Address(input).format();

	++testCount;

	if(output != wanted) {
		console.error('\nAddress parsing error');

		console.error('Input:  ' + input);
		console.error('Output: ' + output);
		console.error('Wanted: ' + wanted);

		++errorCount;
	}

	return([testCount, errorCount]);
}

export function run() {
	var testCount = 0;
	var errorCount = 0;

	var testTbl: { [key: string]: string } = {
		'http://www.example.com': 'http://www.example.com/',
		'http://www.example.com/': 'http://www.example.com/',
		'http://www.example.com/foo': 'http://www.example.com/foo',
		'http://www.example.com/foo/': 'http://www.example.com/foo/',
		'http://www.example.com/foo/..': 'http://www.example.com/',
		'http://www.example.com/foo/../': 'http://www.example.com/',
		'http://www.example.com/foo/../bar': 'http://www.example.com/bar',
		'http://www.example.com/foo/../bar/': 'http://www.example.com/bar/',
		'http://www.example.com/..': 'http://www.example.com/',
		'http://www.example.com/../': 'http://www.example.com/',
	};

	for(var input of Object.keys(testTbl)) {
		var result = testConstructor(input, testTbl[input]);

		testCount += result[0];
		errorCount += result[1];
	}

	return([testCount, errorCount]);
};
