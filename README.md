# gulp-img2js
Embeds images to javascript

[![Build Status](https://travis-ci.org/vladimirgamalian/gulp-img2js.svg?branch=master)](https://travis-ci.org/vladimirgamalian/gulp-img2js)


## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-img2js`

## Information

<table>
<tr>
<td>Package</td><td>gulp-img2js</td>
</tr>
<tr>
<td>Description</td>
<td>Embeds images to javascript</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 4</td>
</tr>
</table>

## Usage

```js
var img2js = require('gulp-img2js');

gulp.task('default', function (){
	gulp.src('./images/*')
		.pipe(img2js('sprites.js'))
		.pipe(gulp.dest('./build'));
});
```

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Vladimir Gamalian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Images for tests designed by Freepik
(License)[http://file005.flaticon.com/downloads/license/license.pdf]
