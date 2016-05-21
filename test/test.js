const img2js = require('../');
const should = require('should');

const PLUGIN_NAME = 'gulp-img2js';

describe(PLUGIN_NAME, function() {

	describe('img2js()', function() {

	    it('should throw, when arguments is missing', function () {
		    (function() {
		    	img2js();
		    }).should.throw(`Missing file option for ${PLUGIN_NAME}`);
	    });
	});
});
