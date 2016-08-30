'use strict';

var Plotly = require('plotly.js');
var J = require('bessel').besselj

function sinc (x) {return Math.abs(x) < 1e-4 ? (1 - x * x / 6) : Math.sin(x) / x;}

window.pl = module.exports = {
  name: '3D',

  n: 51,
  z: [],
  x: [],
  y: [],
  rg: 15,

  omega: 1/1000 * 4,

  initialize: function () {
    for (var i = 0; i < this.n; i++) {
      var x = (i / (this.n - 1) * 2 - 1) * this.rg;
      this.x[i] = x;
      this.z[i] = [];
    }

    for (var j = 0; j < this.n; j++) {
      var y = (j / (this.n - 1) * 2 - 1) * this.rg;
      this.y[j] = y;
    }
  },

  compute: function () {
    var c = Math.cos(-this.omega * this.t());
    var s = Math.sin(-this.omega * this.t());
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.n; j++) {
        var r = Math.sqrt(this.x[i] * this.x[i] + this.y[j] * this.y[j]);
        var a = J(r, 0);
        var b = J(r, 1);
        this.z[i][j] = a * c - b * s;
      }
    }
  },

  t: function () {
    return Date.now() - this.t0;
  },

  plot: function (gd) {
    this.t0 = Date.now();
    this.initialize();
    this.compute();
    this.gd = gd;

    Plotly.plot(gd, [
      {
        x: this.x,
        y: this.y,
        z: this.z,
        type: 'surface',
        line: {simplify: false},
      }
    ], {
      scene: {
        zaxis: {
          range: [-3.1, 3.1],
          autorange: false,
          fixedrange: true,
        }
      }
    });

    var animate = function () {
      this.update();
      this.raf = requestAnimationFrame(animate);
    }.bind(this);

    this.raf = requestAnimationFrame(animate);
  },

  teardown: function () {
    cancelAnimationFrame(this.raf);
  },

  update: function () {
    this.compute();
    Plotly.transition(this.gd, [{z: this.z}], null, null, {duration: 0});
  }
}
