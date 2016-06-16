'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Error Bars 4',
  n: 20,

  x: [],
  y: [],
  dx: [],
  dy: [],
  key: [],


  randomize: function () {
    var i;
    this.x = [];
    this.y = [];
    this.dx = [0.05];
    this.dy = [0.05];
    var k = 0;

    for (i = 0; i < this.n; i++) {
      this.x[i] = k * 0.1 + 2 * (Math.random() - 0.5) * 0.03;
      this.y[i] = Math.sin(k * 0.2) + 2 * (Math.random() - 0.5) * 0.03;

      this.key[i] = k;

      k += Math.floor(1 + Math.pow(Math.random(), 2) * 4);
    }

    for (i = 1; i < this.n; i++) {
      this.dx[i] = Math.max(0.02, this.dx[i - 1] + (Math.random() - 0.5) * 0.02);
      this.dy[i] = Math.max(0.02, this.dy[i - 1] + (Math.random() - 0.5) * 0.02);
    }
    for (i = 0; i < this.n; i++) {
      this.dy[i] *= 4;
    }
  },

  layout: {
    xaxis: {range: [0, 5]},
    yaxis: {range: [-2 * window.innerHeight / window.innerWidth, 2 * window.innerHeight / window.innerWidth]},
  },

  plot: function (gd) {
    this.randomize();

    Plotly.plot(gd, [{
      x: this.x,
      y: this.y,
      key: this.key,
      fill: 'tozeroy',
      mode: 'lines+markers',
      error_x: {
        array: this.dx,
        width: 2,
        thickness: 0.75,
      },
      error_y: {
        array: this.dy,
        width: 2,
        thickness: 0.75,
      },
      line: {
        width: 1
      },
    }], this.layout);
  },

  actionLabels: ['Randomize'],
  actions: [
    function (gd) {
      this.n = 20 + Math.floor(Math.random() * 5);
      this.randomize();

      Plotly.animate(gd, [{
        x: this.x,
        y: this.y,
        'error_y.array': this.dy,
        'error_x.array': this.dx,
        key: this.key,
      }], {duration: 500}, [0]);
    }
  ]
};
