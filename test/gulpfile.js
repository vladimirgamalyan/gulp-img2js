var gulp = require('gulp'),
	img2js = require('../index.js');

gulp.task('default', function (){
	gulp.src('./images/*')
		.pipe(img2js('sprites.js'))
		.pipe(gulp.dest('./tmp'));
});
