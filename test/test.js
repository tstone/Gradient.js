
var Gradient = require('../gradient.es6').default,
    Color = require('color');

var expect = function(a, b) {
    console.log(' -- Expecting: ' + b + ', Is: ' + a);
    if (a !== b) { throw "Does not pass."; }
}

console.log();

// Construct with array
var g1 = Gradient(['#fff', '#000', '#555'], 5);
expect(g1.steps, 5);
expect(g1.stops.length, 3);
expect(g1.stops[0].rgbNumber(),Color('#fff').rgbNumber());
expect(g1.stops[1].rgbNumber(),Color('#000').rgbNumber());
expect(g1.stops[2].rgbNumber(),Color('#555').rgbNumber());

// Construct with arguments
var g2 = Gradient('#fff', '#000', '#555', 10);
expect(g2.steps,10);
expect(g1.stops.length, 3);
expect(g2.stops[0].rgbNumber(),Color('#fff').rgbNumber());
expect(g2.stops[1].rgbNumber(),Color('#000').rgbNumber());
expect(g2.stops[2].rgbNumber(),Color('#555').rgbNumber());

// Results when steps < stops
var g3 = Gradient('#fff', '#000', '#555', 2);
expect(g3.toArray().length, 2);

// Results when steps = stops
var g4 = Gradient('#fff', '#000', '#555', 3);
expect(g4.toArray().length, 3);

// Results when steps > stops, and steps is odd
var g5 = Gradient('#85a7ba', '#e5005d', 7);
expect(g5.toArray().length, 7);

// Results when steps > stops, and steps is even
var g6 = Gradient('#0071bc', '#662d91', '#e5005d', 10);
expect(g6.toArray().length, 10);
/* var html = g6.toArray('rgb').map(function(x){
    return '<div style="height:50px; width:50px; background-color:' + x + '"></div>';
}).join('<br/>');
console.log(html); */

console.log(' -- All tests passed.');
console.log();
