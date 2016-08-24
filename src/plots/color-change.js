'use strict';

var Plotly = require('plotly.js');

function randomColor () {
    return 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
}

module.exports = {
  name: 'Color change',

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
            simplify: false,
            color: randomColor()
        }
      }, {
        x: this.x2,
        y: this.y2,
        mode: 'markers+lines',
        line: {
            simplify: false,
            color: randomColor()
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

    Plotly.transition(gd, [{
        y: this.y1,
        'line.color': randomColor()
    }, {
        y: this.y2,
        'line.color': randomColor()
    }], null, null, {duration: 500, easing: 'cubic-in-out'});
  }
}
