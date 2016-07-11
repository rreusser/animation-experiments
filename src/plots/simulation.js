'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Simulation',

  n: 101,
  x: [],
  y: [],
  dy: [],
  mu: 1,

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2;
    }
  },

  initializeX () {
    this.dx = 1.0 / (this.n - 1);
    this.dt = this.dx * 0.07;
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      this.x[i] = t;
    }
  },

  initializeY () {
    for (var i = 0; i < this.n; i++) {
      var fac = Math.exp(-Math.pow((this.x[i] - 0.5) / 0.1, 2));
      this.dy[i] = Math.cos(this.x[i] * Math.PI * 10) * fac;
      this.y[i] = Math.sin(this.x[i] * Math.PI * 10) * fac;
    }
  },

  updateY () {
    var ym = this.y[0];
    for (var i = 1; i < this.n-1; i++) {
      var deriv2 = (ym - 2 * this.y[i] + this.y[i + 1]) / this.dx / this.dx;

      // Store this so we don't have to swap arrays:
      ym = this.y[i];

      this.y[i] += this.dy[i] * this.dt;
      this.dy[i] += deriv2 * this.dt
      this.dy[i] *= 1 - this.mu * this.dt;
    }
  },

  _onRAF: function () {
    this.updateY();
    Plotly.transition(this.gd, [{y: this.y}], null, null, {duration: 0});

    this.raf = requestAnimationFrame(this.onRAF);
  },

  plot: function (gd) {
    this.initializeX();
    this.initializeY(this.y)

    this.gd = gd;

    Plotly.plot(gd, [
      {
        x: this.x, y: this.y,
        mode: 'markers+lines',
      }
    ], {}, {scrollZoom: true});

    this.onRAF = this._onRAF.bind(this);

    this.raf = requestAnimationFrame(this.onRAF);
  },

  actionLabel: 'Restart',

  action: function () {
    this.initializeY();
  },

  teardown: function () {
    cancelAnimationFrame(this.raf);
  }
}
