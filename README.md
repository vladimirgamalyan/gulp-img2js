# gulp-img2js

> A [Gulp plugin](http://gulpjs.com/) for embedding images to javascript sources

[![Build Status](https://travis-ci.org/vladimirgamalian/gulp-img2js.svg?branch=master)](https://travis-ci.org/vladimirgamalian/gulp-img2js)
[![NPM version](https://img.shields.io/npm/v/gulp-img2js.svg)](https://www.npmjs.com/package/gulp-img2js)
[![Node version](https://img.shields.io/node/v/gulp-img2js.svg)](https://nodejs.org/)


## What does it do

![Image](https://raw.githubusercontent.com/vladimirgamalian/gulp-img2js/master/test/images/agenda.jpg)
![Image](https://raw.githubusercontent.com/vladimirgamalian/gulp-img2js/master/test/images/eye_foo.gif)
![Image](https://raw.githubusercontent.com/vladimirgamalian/gulp-img2js/master/test/images/folder-1.png)

will be converted to a js file:

```js
function createImages() {
    "use strict";
    var result = {};
    result.addUser = new Image();
    result.addUser.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAT...==';
    result.agenda = new Image();
    result.agenda.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAdAB0M...==';
    result.eyeFoo = new Image();
    result.eyeFoo.src = 'data:image/gif;base64,R0lGODlhQ77+MdADrKQh0xkksgQ...=';
    result.folder1 = new Image();
    result.folder1.src = 'data:image/png;base64,iVsm+MCPj7SXEAAAAASUVORK5C...=';
    return result;
}
```

and can be used for example as:

```js
window.onload = function() {
	let canvas = document.getElementById('viewport');
	let ctx = canvas.getContext('2d');
	let images  = createImages();

	ctx.drawImage(images.addUser, 0, 0);
	ctx.drawImage(images.agenda, 100, 0);
	ctx.drawImage(images.eyeFoo, 0, 80);
	ctx.drawImage(images.folder1, 100, 80);
};
```


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
[License](http://file005.flaticon.com/downloads/license/license.pdf)
