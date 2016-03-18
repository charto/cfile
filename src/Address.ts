// This file is part of cfile, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

var reProto = /^(urn|http|https|file):/i;
var reParts = /^([^?#]*)(\?[^#]*)?(#.*)?/;

/** Simple URI container. */

export class Address {
	constructor(uri: string, base?: Address) {
		// Remove leading and trailing whitespace.
		uri = uri.trim();

		// Get protocol.
		var match = reProto.exec(uri);
		var proto = (match && match[0].toLowerCase()) || (base && base.protocol) || '';
		var rest = uri.substr(proto.length);

		this.protocol = proto;

		if(proto == 'urn:') {
			this.partList = rest.split(':');
		} else {
			match = reParts.exec(rest);
			// Split parts before query and hash by forward or backslashes
			// and resolve possibly relative path.
			this.partList = (base || this).resolveParts(match[1].split(/[/\\]/));
			// Drop leading ? from query and split by ampersands.
			this.paramList = match[2] && match[2].substr(1).split('&');
		}
	}

	/** Resolve another URI relative to this address. */

	resolve(uri: string) {
		return(new Address(uri, this));
	}

	/** Convert to URI string. */

	format() {
		var proto = this.protocol;

		if(proto == 'urn:') return(proto + this.partList.join(':'));

		var params = '';
		if(this.paramList && this.paramList.length) {
			params = '?' + this.paramList.join('&');
		}

		return((proto || 'http:') + '//' + this.partList.join('/') + params);
	}

	private resolveParts(otherList: string[]) {
		var partList: string[];

		if(this.partList) {
			if(otherList[0] || otherList.length < 2) {
				// No leading slashes, keep current path.
				partList = this.partList.slice(0);
			} else if(otherList[1] || otherList.length < 3) {
				// 1 leading slash, only keep host or drive.
				partList = this.partList.slice(0, 1);
			} else {
				// 2 leading slashes, drop current path.
				partList = [];
			}
		} else partList = [];

		for(var part of otherList) {
			if(part == '..') {
				if(partList.length > 1) partList.pop();
			} else if(part && part != '.') {
				partList.push(part);
			}
		}

		// Keep any trailing slash.
		if(!part) partList.push(part);

		return(partList);
	}

	/** Protocol including trailing colon, eg. http: or urn: */
	protocol: string;
	/** URL split by slashes without query or hash, or URN split by colons. */
	partList: string[];
	/** Query parameters in the form a=b. */
	paramList: string[];
}
