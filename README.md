
Gradient.js
===========

Generate you some gradients!

Using Gradient.js Server-side
---------------------------
Install the gradient module (TODO: module not yet active)

```
npm install gradient
```

Add it to your source.

```
var Gradient = require('gradient');
```

Using Gradient.js Client-side
---------------------------
Include gradient-min.js within your page. (TODO: no gradient-min.js built yet)

```html
<script src="gradient-min.js"></script>
```

Generating Gradients
--------------------

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

Other (Better) Uses
-------------------

Generate awesome colors for your gRaphael pie charts.

```javascript
var paper = Raphael(10, 50, 640, 480);
var data = [55, 20, 13, 32, 5, 1, 2];
var colors = Gradient('#97aeba', '#0a3d54', data.length).toArray('rgbString');
paper.piechar(320, 240, 100, data, { colors: colors });
```

Running the Tests
--------------------

```
node test/test.js
```
