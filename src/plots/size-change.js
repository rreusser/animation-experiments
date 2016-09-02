'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Size change',

  n: 31,
  x1: [],
  x2: [],
  y1: [],
  y2: [],
  r1: [],
  r2: [],

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2;
    }
  },

  randomizeSize (output) {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.round(1 + Math.pow(Math.random(), 2) * 30);
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
    this.randomizeSize(this.r1)
    this.randomizeSize(this.r2)

    Plotly.plot(gd, [
      {
        x: this.x1,
        y: this.y1,
        mode: 'markers+lines',
        marker: {
          sizeref: 1,
          size: this.r1,
        },
        line: {
            simplify: false,
        }
      }, {
        x: this.x2,
        y: this.y2,
        mode: 'markers+lines',
        marker: {
          sizeref: 1,
          size: this.r2,
        },
        line: {
            simplify: false,
        }
      }
    ], {
        xaxis: {
            autorange: false,
            range: [0, 1]
        },
        yaxis: {
            autorange: false,
            range: [-2, 2]
        }
    }, {scrollZoom: true});
 },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)
    this.randomizeSize(this.r1)
    this.randomizeSize(this.r2)

    Plotly.animate(gd, {
      data: [{
          y: this.y1,
          'marker.size': this.r1,
      }, {
          y: this.y2,
          'marker.size': this.r2,
      }]
    }, {
      transition: {
        duration: 1000,
        easing: 'elastic-in'
      }
    });
  }
}
