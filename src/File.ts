// This file is part of cfile, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

// For typing info, not actual dependencies.
import * as stream from 'stream';

import {Address} from './Address';

export type RequestHeaders = {[key: string]: string};

export interface FileContents {
	string?: string;
	arrayU8?: Uint8Array;
	xhr?: XMLHttpRequest;
	headers?: RequestHeaders;

	nodeStream?: stream.Readable;
	nodeBuffer?: Buffer;
}

/** May contain: string, Uint8Array, XMLHttpRequest, HTTP headers, Node.js stream and/or buffer. */

export class File {
	history: Address[];

	contents: FileContents;
}
