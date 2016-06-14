'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Tonext',

  n: 31,
  x1: [],
  x2: [],
  x3: [],
  y1: [],
  y2: [],
  y3: [],

  randomizeData (output, add) {
    add = add || 0;
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2 + add;
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      this.x1[i] = this.x2[i] = this.x3[i] = t;
    }
  },

  plot: function (gd) {
    this.initializeX();
    this.randomizeData(this.y1, 2)
    this.randomizeData(this.y2, 3.5)
    this.randomizeData(this.y3, 5)

    Plotly.plot(gd, [
      {
        x: this.x1,
        y: this.y1,
        type: 'scatter',
        mode: 'markers+lines',
        name: 'with tozero',
        fill: 'tozeroy',
      },
      {
        x: this.x2,
        y: this.y2,
        type: 'scatter',
        mode: 'markers+lines',
        fill: 'tonexty',
        name: '1st tonext',
      },
      {
        x: this.x3,
        y: this.y3,
        type: 'scatter',
        mode: 'markers+lines',
        fill: 'tonexty',
        name: '2nd tonext',
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
    this.randomizeData(this.y1, 2)
    //this.randomizeData(this.y2, 3.5)
    this.randomizeData(this.y3, 5)

    Plotly.animate(gd, [
      {y: this.y1},
      //{y: this.y2},
      {y: this.y3}
    ], {duration: 500, easing: 'cubic-in-out'}, [
      0,
      //1,
      2
    ]);
  }
}
