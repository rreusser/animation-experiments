'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Keyed Scatter',

  n: 31,
  x1: [],
  x2: [],
  y1: [],
  y2: [],

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2;
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      this.x1[i] = this.x2[i] = t;
    }
  },

  plot: function (gd) {
    this.initializeX();
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.plot(gd, [
      {
        x: this.x1, y: this.y1,
        mode: 'markers+lines',
      }, {
        x: this.x2, y: this.y2,
        mode: 'markers+lines',
      }
    ], {}, {scrollZoom: true});

  },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.animate(gd, [{y: this.y2}], {duration: 500, easing: 'cubic-in-out'}, [1]);
  }
}
