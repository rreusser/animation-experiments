'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Polar scatter',

  n: 360,
  r1: [],
  r2: [],
  t1: [],
  t2: [],

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = this.t1[i];
      output[i] = 2 + Math.sin(Math.PI * 24 * t / 360 + phase);
    }
    output[this.n - 1] = output[0];
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1) * 360;
      this.t1[i] = this.t2[i] = t;
    }
  },

  plot: function (gd) {
    this.initializeX();
    this.randomizeData(this.r1)
    this.randomizeData(this.r2)

    Plotly.plot(gd, [
      {
        r: this.r1,
        t: this.t1,
        mode: 'markers',
      }, {
        r: this.r2,
        t: this.t2,
        mode: 'markers',
      }
    ], {}, {scrollZoom: true});
 },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(this.t1)
    this.randomizeData(this.t2)

    Plotly.animate(gd, [{t: this.r1}, {t: this.r2}], {duration: 500, easing: 'cubic-in-out'}, [0, 1]);
  }
}
