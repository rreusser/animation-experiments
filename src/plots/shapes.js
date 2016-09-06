'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Shapes',

  n: 31,
  x1: [],
  x2: [],
  y1: [],
  y2: [],

  randomizeData (output) {
    var phase = Math.random() * Math.PI * 2;

    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      output[i] = Math.sin(Math.PI * t + phase) + 0.2 * Math.sin(Math.PI * 4 * t) + (Math.random() - 1) * 0.2;
    }
  },

  initializeX () {
    for (var i = 0; i < this.n; i++) {
      var t = i / (this.n - 1);
      this.x1[i] = this.x2[i] = t;
    }
  },

  getShapes: function () {
    var r = Math.random() * 0.2;
    return [{
      type: 'circle',
      xref: 'x',
      yref: 'y',
      x0: 0.5 - r,
      y0: 0.5 - r,
      x1: 0.5 + r,
      y1: 0.5 + r,
      opacity: 0.2,
      fillcolor: 'blue',
      line: {
          color: 'blue'
      }
    }];
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
        line: {
            simplify: false
        }
      }, {
        x: this.x2,
        y: this.y2,
        mode: 'markers+lines',
        line: {
            simplify: false
        }
      }
    ], {
      shapes: this.getShapes()
    }, {scrollZoom: true});
 },

  actionLabel: 'Animate',

  action: function (gd) {
    this.randomizeData(this.y1)
    this.randomizeData(this.y2)

    Plotly.animate(gd, {
      data: [{y: this.y1}, {y: this.y2}],
      layout: {
        shapes: this.getShapes()
      }
    }, {
      transition: {
        duration: 1000,
        easing: 'elastic-in'
      }
    });
  }
}
