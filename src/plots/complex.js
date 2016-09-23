'use strict';

var math = require('mathjs');
var Plotly = require('plotly.js');

var colorscale = [[0.0, 'rgb(0, 242, 242)'],
 [0.08333333333333333, 'rgb(0, 121, 242)'],
 [0.16666666666666666, 'rgb(0, 0, 242)'],
 [0.25, 'rgb(121, 0, 242)'],
 [0.3333333333333333, 'rgb(242, 0, 242)'],
 [0.41666666666666663, 'rgb(242, 0, 121)'],
 [0.5, 'rgb(242, 0, 0)'],
 [0.5833333333333333, 'rgb(242, 121, 0)'],
 [0.6666666666666666, 'rgb(242, 242, 0)'],
 [0.75, 'rgb(121, 242, 0)'],
 [0.8333333333333333, 'rgb(0, 242, 0)'],
 [0.9166666666666666, 'rgb(0, 242, 121)'],
 [1.0, 'rgb(0, 242, 242)']];

var x = linspace(-2, 2, 200);
var y = linspace(-2, 2, 200);

var w = x.map((xi) => y.map((yi) => {
  var z =  math.complex(xi, yi);
  var num = math.add(pow(z, 3), -1);
  var den = math.add(pow(z, 5), 0.2);
  return divide(num, den);
}));

var h = w.map((row) => row.map((wi) => {
  var hi = abs(wi);
  if(hi < -7) return -7;
  if(hi > 7) return 7;
  return hi;
}));

var phi = w.map((row) => row.map((wi) => {
  return argument(wi);
}));

function linspace(start, end, size) {
  var step =  (end - start) / size;
  return fill(size, (_, i) => start + i*step);
}

function fill(N, func) {
  var empty = Array.apply(null, Array(N));
  return empty.map(func);
}

function pow(v, exp) {
  var out = math.complex(1);
  for(var i = 0; i < exp; i++) {
    out = math.multiply(out, v);
  }
  return out;
}

function divide(z1, z2) {
  var a = math.re(z1);
  var b = math.im(z1);
  var c = math.re(z2);
  var d = math.im(z2);

  var re = (a*c + b*d) / (c*c + d*d);
  var im = (b*c - a*d) / (c*c + d*d);

  return math.complex(re, im);
}

function dist(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function abs(v) {
  return dist(math.re(v), math.im(v));
}

function argument(v) {
  return Math.atan2(math.im(v), math.re(v));
}

module.exports = {
  name: 'Complex',

  plot: function (gd) {
    Plotly.plot(gd, [{
      type: 'surface',
      x: x,
      y: y,
      z: h,
      surfacecolor: phi,
      colorscale: colorscale,
      cmin: -Math.PI,
      cmax: -Math.PI
    }], {
      scene: {
        aspectratio: { x: 1, y: 1, z: 1 }
      },
      width: window.innerWidth,
      height: window.innerHeight
    });
 },
}
