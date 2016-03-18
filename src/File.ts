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

export interface RelatedFiles {
	[key: string]: File;

	sourceMap: File;
}

/** Represents a remote or local file and its contents (stream or buffer). */

export class File {
	constructor(uri: string | Address) {
		if(typeof(uri) == 'string') uri = new Address(uri as string);

		if(uri instanceof Address) {
			this.baseAddress = uri;
			this.address = uri;
		}
	}

	/** Where the file thinks it is, and the base of any relative paths inside it. */
	baseAddress: Address;
	/** Current guess of file location. Changes until all possible redirects
	  * are resolved (possibly to a file in disk cache). */
	address: Address;

	/** List of earlier addresses such as resolved HTTP redirects. */
	history: Address[];

	/** Related files, such as a source map. */
	related: RelatedFiles;

	/** String, Uint8Array, XMLHttpRequest, HTTP headers, Node.js stream and/or buffer. */
	contents: FileContents;
}
