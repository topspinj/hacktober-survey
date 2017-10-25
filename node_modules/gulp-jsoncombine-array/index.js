"use strict";
var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function (fileName, converter) {
	if (!fileName) {
		throw new PluginError('gulp-jsoncombine-array', 'Missing fileName option for gulp-jsoncombine-array');
	}
	if (!converter) {
		throw new PluginError('gulp-jsoncombine-array', 'Missing converter option for gulp-jsoncombine-array');
	}

	var dataArray = [];
	var meta = {};
	var firstFile = null;

	// We keep track of when we should skip the conversion for error cases
	var skipConversion = false;

	function bufferContents(file) {
		if (!firstFile) {
			firstFile = file;
		}

		if (file.isNull()) {
			return; // ignore
		}
		if (file.isStream()) {
			skipConversion = true;
			return this.emit('error', new PluginError('gulp-jsoncombine-array', 'Streaming not supported'));
		}
		try {
			var name = file.relative.substr(0,file.relative.length-5);
			dataArray.push(JSON.parse(file.contents.toString()));
			meta[name] = {cwd: file.cwd, base: file.base, path: file.path};
		} catch (err) {
			skipConversion = true;
			return this.emit('error', new PluginError('gulp-jsoncombine-array', 'Error parsing JSON: ' + err + ', file: ' + file.path.slice(file.base.length)));
		}
	}

	function endStream() {
		if (firstFile && !skipConversion) {
			var joinedPath = path.join(firstFile.base, fileName);

			try {
				var joinedFile = new File({
					cwd: firstFile.cwd,
					base: firstFile.base,
					path: joinedPath,
					contents: converter(dataArray, meta)
				});
				this.emit('data', joinedFile);
			}	catch (e) {
				return this.emit('error', new PluginError('gulp-jsoncombine-array', e, { showStack: true }));
			}
		}
		this.emit('end');
	}

	return through(bufferContents, endStream);
};
