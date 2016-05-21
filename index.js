'use strict';

const path = require('path');
const fs = require('fs');
const through = require('through2');
const gutil = require('gulp-util');
const chalk = require('chalk');
const changeCase = require('change-case');
const beautify = require('js-beautify').js_beautify;
const PluginError = gutil.PluginError;

module.exports = function (file) {

	const PLUGIN_NAME = 'gulp-img2js';
	const validExts = ['.jpg', '.jpeg', '.png', '.gif'];

	if (!file) {
    	throw new PluginError(PLUGIN_NAME, `Missing file option for ${PLUGIN_NAME}`);
  	}

	if (typeof file !== 'string') {
    	throw new PluginError(PLUGIN_NAME, `File option must be a string for ${PLUGIN_NAME}`);
  	}

  	let usedIndentifiers = new Set();
  	let latestFile;
  	let result = `
  		function createImages() {
    		"use strict";
    		var result = {};
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
      		this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      		cb();
      		return;
    	}

    	// skip unsupported images
    	let ext = path.extname(file.path).toLowerCase();
	    if (validExts.indexOf(ext) === -1) {
			gutil.log(`${PLUGIN_NAME}: Skipping unsupported image ${chalk.blue(file.relative)}`);
			cb();
			return;
		}

		if (!latestFile) {
			latestFile = file;
		}

		// convert file name to js identifier
		let imgName = path.basename(file.path, path.extname(file.path));
		imgName = changeCase.camelCase(imgName);
		if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(imgName)) {
      		this.emit('error', new PluginError(PLUGIN_NAME, `Invalid js identifier for file ${file.path}`));
      		cb();			
		}

		// test if identifier is already used
		if (usedIndentifiers.has(imgName)) {
			this.emit('error', new PluginError(PLUGIN_NAME, `Duplicate js identifier for file ${file.path}`));
      		cb();						
		}
		usedIndentifiers.add(imgName);

		let base64data = fs.readFileSync(file.path).toString('base64');

		ext = ext.substr(1);
		if (ext === 'jpg') {
			ext = 'jpeg';
		}		
		result += `result.${imgName} = new Image();
			result.${imgName}.src = 'data:image/${ext};base64,${base64data}';
		`;

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
