'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Error Bars 4',
  n: 3,

  x: [],
  y: [],
  dx: [],
  dy: [],
  key: [],


  randomize: function () {
    var i;
    this.x = [];
    this.y = [];
    this.key = [];
    this.dx = [];
    this.dy = [];
    var k = 0;

    for (i = 0; i < this.n; i++) {
      this.x[i] = k * 0.1 + 2 * (Math.random() - 0.5) * 0.08;
      this.y[i] = Math.sin(k * 0.2) + 2 * (Math.random() - 0.5) * 0.08;

      this.key[i] = k;

      k += Math.floor(1 + Math.pow(Math.random(), 2) * 4);
    }

    for (i = 0; i < this.n; i++) {
      this.dx[i] = Math.max(0.02, 0.02 + (Math.random() - 0.5) * 0.02);
      this.dy[i] = Math.max(0.02, 0.02 + (Math.random() - 0.5) * 0.02) * 4;
    }

    console.log('this.x.length:', this.x.length);
    console.log('this.y.length:', this.y.length);
    console.log('this.dx.length:', this.dx.length);
    console.log('this.dy.length:', this.dy.length);
    console.log('this.key.length:', this.key.length);
  },

  layout: {
    xaxis: {range: [-0.5, 1]},
    yaxis: {range: [-2 * window.innerHeight / window.innerWidth, 2 * window.innerHeight / window.innerWidth]},
  },

  plot: function (gd) {
    this.randomize();

    Plotly.plot(gd, [{
      x: this.x,
      y: this.y,
      identifier: this.key,
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
      this.n = 3 + Math.floor(Math.random() * 3);
      this.randomize();

      Plotly.animate(gd, {
        data: [{
          x: this.x,
          y: this.y,
          'error_y.array': this.dy,
          'error_x.array': this.dx,
          ids: this.key,
        }]
      }, {
        transition: {duration: 1500}
      });
    }
  ]
};
