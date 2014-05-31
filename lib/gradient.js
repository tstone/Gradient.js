var sets = function(xs) {
  var loop = function(acc, i) {
      if (i == xs.length || !xs[i+1]) { return acc; }
      acc.push([xs[i], xs[i+1]]);
      return loop(acc, i + 1);
  }
  return loop([], 0);
};

// ------------------------------------------------------------------------ //

var Color = require('color')
  , Gradient = function(/* [color1, color2, steps] -or- [[array], steps] */) {
        var args = arguments[0];
        this.stops = [];
        this.steps = 2;

        // Slice up arguments
        if (Object.prototype.toString.call(args[0]) === '[object Array]') {
            for (var i = 0; i < (args[0].length); i++) {
                this.stops.push(Color(args[0][i]));
            }
            this.steps = args[1];
        } else {
            for (var i = 0; i < (args.length - 1); i++) {
                this.stops.push(Color(args[i]));
            }
            this.steps = args[args.length - 1];
        }
    };

(function(obj){

    // Build given number of steps, including start and end
    var buildSteps = function(start, end, span) {
        var steps = [start];
        if (span < 0) {
            steps.push(end);
            for (var i = 0; i < Math.abs(span); i++) { steps.pop(); }
        } else {

            var base = { h: start.hue(), s: start.saturation(), l: start.lightness(), a: start.alpha() };
            var delta = {
                h: (base.h - end.hue()) / span,
                s: (base.s - end.saturation()) / span,
                l: (base.l - end.lightness()) / span,
                a: (base.a - end.alpha()) / span
            };

            for (var i = 1; i <= span; i++) {
                var h = base.h - (delta.h * i);
                var s = base.s - (delta.s * i);
                var l = base.l - (delta.l * i);
                var a = base.a - (delta.a * i);

                // Round out values
                if (h > 360) { h -= 360; } else if (h < 0) { h += 360; }
                if (s > 100) { s = 100; } else if (s < 0) { s = 0; }
                if (l > 100) { l = 100; } else if (l < 0) { l = 0; }
                if (a > 1) { a = 1; } else if (a < 0) { a = 0; }

                // Build new color object
                var c = Color().hue(h).saturation(s).lightness(l).alpha(a);
                steps.push(c);
            }
            steps.push(end);
        }
        return steps;
    };

    // To array
    obj.toArray = function(format) {

        // Generate gradient steps
        if (typeof this.__cache === 'undefined') {
            var stops = this.stops;
            var steps = this.steps;
            var overflow = Math.floor(stops.length / 2);
            var cs = [];

            sets(stops).forEach(function(x){
                // Determine step span for set
                var span;
                if (stops.length === 2) { span = steps; }
                else {
                    span = Math.floor(steps / (stops.length - 1));
                    if (overflow > 0 && steps % (stops.length - 1) != 0) { span += 1; overflow--; }
                }
                // Don't double count the start/end
                span -= 2;
                // Generate colors for this set
                cs = cs.concat(buildSteps(x[0], x[1], span));
            });
            this.__cache = cs;
        }

        // Return in specified format
        if (typeof format !== 'undefined') {
            return this.__cache.map(function(x){ return x[format](); });
        } else {
            return this.__cache;
        }
    };

}(Gradient.prototype));

module.exports = function() {
   return new Gradient(Array.prototype.slice.call(arguments,0));
};
