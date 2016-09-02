'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Error Bars',

  randomizeData: function () {
    var i, j;
    var n = this.trace.x.length;
    for (i = 0; i < n; i++) {
      this.trace.y[i] = 5 + 2 * (Math.random() - 0.5) * 2;
      var err = 0.25 + 0.5 * Math.random();
      this.error.y[i] = this.trace.y[i] + err;
      this.error.y[2 * n - i - 1] = this.trace.y[i] - err;
    }
  },

  error: {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    y: [5.5, 3, 5.5, 8, 6, 3, 8, 5, 6, 5.5, 4.75, 5, 4, 7, 2, 4, 7, 4.4, 2, 4.5],
    fill: "tozerox",
    fillcolor: "rgba(0,176,246,0.2)",
    line: {color: "transparent"},
    name: "Premium",
    line: {
      shape: 'spline',
      width: 0,
    },
    showlegend: false,
    type: "scatter"
  },

  trace: {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [5, 2.5, 5, 7.5, 5, 2.5, 7.5, 4.5, 5.5, 5],
    line: {color: "rgb(0,176,246)"},
    mode: "lines",
    name: "Premium",
    line: {shape: 'spline'},
    type: "scatter"
  },

  layout: {
    paper_bgcolor: "rgb(255,255,255)",
    plot_bgcolor: "rgb(229,229,229)",
    xaxis: {
      gridcolor: "rgb(255,255,255)",
      range: [1, 10],
      showgrid: true,
      showline: false,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      ticks: "outside",
      zeroline: false
    },
    yaxis: {
      gridcolor: "rgb(255,255,255)",
      showgrid: true,
      showline: false,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      ticks: "outside",
      zeroline: false
    }
  },

  plot: function (gd) {
    this.traces = [this.error, this.trace];

    Plotly.plot(gd, this.traces, this.layout);
  },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData();

    Plotly.animate(gd, {
      data: [{y: this.error.y}, {y: this.trace.y}]
    }, {
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      }
    });
  }
}
