'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Scale transition',

  n: 500,
  x1: [],
  y1: [],
  y2: [],

  range: [
    {x: [0, 1], y: [0, 1]},
    {x: [0, 0.2], y: [0, 0.2]},
    {x: [0.2, 0.4], y: [0.2, 0.4]},
    {x: [0.4, 0.8], y: [0.4, 0.8]},
    {x: [0.8, 1.0], y: [0.8, 1.0]},
  ],

  rangeNum: 0,

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    var normal = Plotly.d3.random.normal();

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = t + (normal() - 0.5) * 0.1;
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      this.x1[i] = t;
    }
  },

  plot: function (gd) {
    var range = this.range[0];
    this.initializeX();
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.plot(gd, [
      {
        x: this.x1,
        y: this.y1,
        mode: 'markers',
      },
      {
        x: this.x1,
        y: this.y1,
        mode: 'markers',
        xaxis: 'x',
        yaxis: 'y2',
      },
    ], {
      dragmode: 'pan',
      xaxis: {
        range: range.x.slice(0)
      },
      yaxis: {
        domain: [0, 0.45],
        range: range.y.slice(0),
      },
      yaxis2: {
        anchor: 'x',
        domain: [0.55, 1],
        range: range.y.slice(0),
      }
    }, {scrollZoom: true});
 },

  actionLabel: 'Zoom in/out',

  action: function (gd) {
    this.rangeNum = (this.rangeNum + 1) % this.range.length;
    var range = this.range[this.rangeNum];

    Plotly.animate(gd, [], {duration: 500, easing: 'cubic-in-out'}, [], {
      'xaxis.range': range.x.slice(0),
      'yaxis.range': range.y.slice(0),
    });
  }
}
