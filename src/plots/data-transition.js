'use strict';

var Plotly = require('plotly.js');

window.plotData = module.exports = {
  name: 'Data transition',

  n: 201,
  x1: [],
  y1: [],
  y2: [],

  rangeNum: 0,

  randomizeData (output) {
    var normal = Plotly.d3.random.normal();

    for (var i = 0; i < this.n; i++) {
      //var t = i / (this.n - 1) * n;
      var t = i;
      output[i] = t + (normal() - 0.5) * this.n / 20;
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      //var t = i / (this.n - 1);
      var t = i;
      this.x1[i] = t;
    }
  },

  plot: function (gd) {
    this.range = [
      {x: [0, this.n / 1], y: [0, this.n / 1]},
      {x: [0, this.n / 2], y: [0, this.n / 2]},
      {x: [0, this.n], y: [0, this.n]},
    ];
    var range = this.range[0];
    this.initializeX();
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    this.x1[0] = 0;
    this.y1[0] = 0;
    this.y2[0] = 0;

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
        range: range.y.slice(0)
      },
      yaxis2: {
        anchor: 'x',
        domain: [0.55, 1],
        range: [0, this.n],
      }
    }, {scrollZoom: true});
 },

  actionLabel: 'Transition',

  action: function (gd) {
    this.rangeNum = (this.rangeNum + 1) % this.range.length;
    var range = this.range[this.rangeNum];

    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.animate(gd, {
      data: [{y: this.y1}, {y: this.y2}],
      traces: [0, 1]
    }, {
      transition: {
        duration: 1000,
        easing: 'cubic-in-out'
      }
    });
  }
}
