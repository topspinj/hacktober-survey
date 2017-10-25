'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var json2csv = require('json2csv');
var lme = require('lme');

module.exports = function() {

	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-json2csv', 'Streaming not supported'));
			return;
		}

		try {
			// console.log(JSON.parse(file.contents.toString()));
			file.contents = new Buffer(json2csv({ data: JSON.parse(file.contents.toString()) }));
			lme.s('csv created from json');
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-json2csv', err));
		}

		cb();
	});
};
