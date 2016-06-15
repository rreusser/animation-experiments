'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Animated Log Scatter',

  n: 31,
  x1: [],
  x2: [],
  y1: [],
  y2: [],

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = 5 + Math.pow(Math.sin(Math.PI * t + phase) + 2.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 2.2, 4);
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = (i + 1) / (this.n);
      this.x1[i] = this.x2[i] = t;
    }
  },

  plot: function (gd) {
    this.initializeX();
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.plot(gd, [
      {
        x: this.x1,
        y: this.y1,
        mode: 'markers+lines',
      }, {
        x: this.x2,
        y: this.y2,
        mode: 'markers+lines',
      }
    ], {
      xaxis: {
        type: 'log',
      },
      yaxis: {
        type: 'log',
        range: [0, 3]
      }
    }, {scrollZoom: true});
 },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.animate(gd, [{y: this.y1}, {y: this.y2}], {duration: 500, easing: 'cubic-in-out'}, [0, 1]);
  }
}
