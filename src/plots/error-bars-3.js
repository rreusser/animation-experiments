'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Error Bars 3',
  n: 100,
  x: [],
  y: [],
  dy: [],

  createDates: function () {
    this.x = [];
    this.x = [new Date(2001, 6, 11, 11)];
    for (var i = 1; i < this.n; i++) {
      this.x[i] = new Date(+this.x[i - 1] + 60 * 10 * 1000)
    }
  },

  createSpeeds: function () {
    this.y = [];
    this.y[0] = 2;
    this.y[1] = 2.05;
    for (var i = 2; i < this.n; i++) {
      this.y[i] = (this.y[i - 1] + (this.y[i - 1] - this.y[i - 2]) * 0.5 + 0.1 * 2 * (Math.random() - 0.5)) * 0.9 + 0.1 * 2;
    }
  },

  createError: function () {
    this.dy = [];
    var sc = 0.2 + 0.8 * Math.random()
    for (var i = 0; i < this.n; i++) {
      this.dy[i] = 0.2 * Math.random() * sc;
    }
  },

  layout: {
    yaxis: {
      title: "Wind Speed",
      range: [1.2, 2.8]
    },
    xaxis: {
      showgrid: false,
      tickformat: "%H:%M"
    },
  },

  plot: function (gd) {
    this.createDates();
    this.createSpeeds();
    this.createError();

    Plotly.plot(gd, [{
      x: this.x,
      y: this.y,
      line: {
        width: 1,
        simplify: false,
      },
      error_y: {
        width: 0,
        array: this.dy,
        thickness: 0.5
      }
    }], this.layout);
  },

  actionLabels: ['Randomize'],
  actions: [
    function (gd) {
      this.n = 75 + Math.round(Math.random() * 25);
      this.createDates();
      this.createSpeeds();
      this.createError();

      Plotly.animate(gd, {
        data: [{x: this.x, y: this.y, 'error_y.array': this.dy}]
      }, {
        transition: {duration: 500}
      });
    }
  ]
};
