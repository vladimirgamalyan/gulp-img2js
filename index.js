'use strict';

const path = require('path');
const through = require('through2');
const gutil = require('gulp-util');
const chalk = require('chalk');
const beautify = require('js-beautify').js_beautify;
const PluginError = gutil.PluginError;

module.exports = function (file) {

	const PLUGIN_NAME = 'gulp-img2js';
	const validExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

	if (!file) {
    	throw new PluginError(PLUGIN_NAME, `Missing file option for ${PLUGIN_NAME}`);
  	}

	if (typeof file !== 'string') {
    	throw new PluginError(PLUGIN_NAME, `File option must be a string for ${PLUGIN_NAME}`);
  	}

  	let latestFile;
  	let result = `
  		export createImages() {
    		"use strict";
    		var result = {},
        	prefix = "data:image/png;base64,";
    `;

  	function bufferContents(file, enc, cb) {

		gutil.log(`file ${file.path}`);

  		// ignore empty files
		if (file.isNull()) {
			cb();
			return;
		}

		// we don't do streams
    	if (file.isStream()) {
      		this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));
      		cb();
      		return;
    	}

    	// skip unsupported images
	    if (validExts.indexOf(path.extname(file.path).toLowerCase()) === -1) {
			gutil.log(`${PLUGIN_NAME}: Skipping unsupported image ${chalk.blue(file.relative)}`);
			cb();
			return;
		}

		if (!latestFile) {
			latestFile = file;
		}

		result += 'result.brick = new Image();\n';

		cb();
  	}

  	function endStream(cb) {

		gutil.log('end of files');

  		// no files passed in, no file goes out
    	if (!latestFile) {
      		cb();
      		return;
    	}

    	result += `return result;
    		}
    	`;
		result = beautify(result);

   		var outputFile = latestFile.clone({contents: false});
   		outputFile.path = path.join(latestFile.base, file);
  		outputFile.contents = new Buffer(result);

  		this.push(outputFile);
  		cb();
  	}

  	return through.obj(bufferContents, endStream);
};
