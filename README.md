
Gradient.js
===========

Generate you some gradients!  Gradient.js is built on top of harthur/color https://github.com/harthur/color.

Using Gradient.js Server-side
---------------------------
Install the gradient module

```
npm install gradient
```

Add it to your source.

```
var Gradient = require('gradient');
```

Using Gradient.js Client-side
---------------------------
There are two ways to go about this.

Option 1.) Download gradient-min.js from github and include it within your page.

```html
<script src="gradient-min.js"></script>
```

Option 2.) Build your own uncompressed or minified copy.

If you don't have Jake installed...

```
$ npm install -g jake
```

Then build and minify...

```
$ jake build
$ jake minify
```

Usage
--------------------

A single class is exposed, Gradient, which takes a list of colors stops and steps.

```javascript
// Colors can be given as an unlimited number of parameters.  Steps is always the last parameter
var grad = Gradient('#0071bc', '#662d91', '#e5005d', 10);

// Or they can be given as an array
var colorStops = ['#0071bc', '#662d91', '#e5005d'];
var grad = Gradient(colorStops, 10);
```

Colors can be inputted in any of mulitple formats: hex, rgb string, rgba string, or rgb hash.

```javascript
var grad = Gradient('#0071bc', 'rgb(255, 67, 100)', { r: 100, g: 50, b: 10 }, 10);
```

The return value is a class instance which contains a .toArray method.  If run without arguments this method will return an array of Color objects derived from https://github.com/harthur/color.

```javascript
var grad = Gradient('#0071bc', '#662d91', '#e5005d', 10);
var colors = grad.toArray();
```

Optionally, a string value can be given indication the output format.

Possible values:  hexString, rgbString, percentString, named

```javascript
var grad = Gradient('#0071bc', '#662d91', '#e5005d', 10);
console.log(grad.toArray('hexString'));

>>>
[ '#0071BC',
  '#0F31AE',
  '#351D9F',
  '#652C90',
  '#662D91',
  '#662D91',
  '#9F1FAB',
  '#C71199',
  '#E6005C',
  '#E5005D' ]
```

Using Gradients in gRaphel Charts
-------------------

Generate awesome colors for your gRaphael pie charts.

```javascript
var paper = Raphael(10, 50, 640, 480);
var data = [55, 20, 13, 32, 5, 1, 2];
var colors = Gradient('#97aeba', '#0a3d54', data.length).toArray('rgbString');
paper.piechar(320, 240, 100, data, { colors: colors });
```

Stupid Gradient Tricks
----------------------

Bring back 1998 with rainbow HTML.

```javascript
function rainbowString (s) {
    var grad = Gradient('#0071bc', '#662d91', '#e5005d', s.length);
    return grad.toArray('hexString').map(function (x, i){
        return '<span>' + s[i] + '</span>';
    }).join('');
};

document.write(rainbowString("Hello World!"));
```

Running the Tests
--------------------

```
node test/test.js
```
