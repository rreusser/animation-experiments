'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'tonext',

  x: [[], [], []],
  y: [[], [], []],

  randomizeData (j, x, y, add) {
    add = add || 0;
    var phase = Math.random() * Math.PI * 2;

    var x = this.x[j] = [];
    var y = this.y[j] = [];

    //var n = 15;
    //var n = Math.round(2 + 15 * Math.random())
    var n = 12;

    for (var i = 0; i < n; i++) {
      var t = i / (n - 1);
      x[i] = t;
      y[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2 + add;
    }
  },

  plot: function (gd) {
    this.randomizeData(0, this.x, this.y, 2)
    this.randomizeData(1, this.x, this.y, 3.5)
    this.randomizeData(2, this.x, this.y, 5)

    Plotly.plot(gd, [
      {
        x: this.x[0],
        y: this.y[0],
        type: 'scatter',
        mode: 'markers+lines',
        name: 'with tozero',
        fill: 'tozeroy',
        line: {simplify: false},
      },
      {
        x: this.x[1],
        y: this.y[1],
        type: 'scatter',
        mode: 'markers+lines',
        fill: 'tonexty',
        name: '1st tonext',
        line: {simplify: false},
      },
      {
        x: this.x[2],
        y: this.y[2],
        type: 'scatter',
        mode: 'markers+lines',
        fill: 'tonexty',
        name: '2nd tonext',
        line: {simplify: false},
      }
    ], {
      yaxis: {
        range: [0, 8]
      },
      margin: {
        t: 80,
        r: 30,
        b: 30,
        l: 30
      }
    }, {scrollZoom: true});
 },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(0, this.x, this.y, 2)
    //this.randomizeData(this.y[1], 3.5)
    this.randomizeData(2, this.x, this.y, 5)

    Plotly.transition(gd, [
          {x: this.x[0], y: this.y[0]},
          {x: this.x[2], y: this.y[2]}
        ],
        null,
        [0, 2],
        {duration: 500, easing: 'cubic-in-out'}
    );
  }
}
