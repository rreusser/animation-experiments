'use strict';

var Plotly = require('plotly.js');
var shuffle = require('fisher-yates/inplace');

module.exports = {
  name: 'Object Constancy',

  n: 5,
  x: [],
  y: [],
  keys: [],
  duration: 500,

  plot: function (gd) {
    Plotly.plot(gd, this.getFrame(), this.layout, {scrollZoom: true});
  },

  getFrame: function (ndiff) {
    this.n = Math.max(4, this.n + (ndiff || 0));

    // Truncate arrays if removing:
    if (ndiff < 0) {
      this.x = this.x.slice(0, this.n);
      this.y = this.y.slice(0, this.n);
      this.keys = this.keys.slice(0,this.n);
    }

    // Randomize existing points:
    shuffle(this.keys);
    this.keys = this.keys.slice(0);

    // Re-circle:
    for (var i = 0; i < this.n; i++) {
      var t = i / this.n * 2 * Math.PI;
      this.x[i] = Math.cos(t);
      this.y[i] = Math.sin(t);
      this.keys[i] = this.keys[i] === undefined ? i : this.keys[i];
    }

    // The new trace:
    return [{
      x: this.x,
      y: this.y,
      ids: this.keys,
      mode: 'markers',
    }]
  },

  actionLabels: ['Shuffle and append', 'Shuffle and remove'],

  actions: [
    function (gd) {
      Plotly.animate(gd, {
        data: this.getFrame(1)
      }, {
        transition: {
          duration: this.duration
        }
      })
    },
    function (gd) {
      Plotly.animate(gd, {
        data: this.getFrame(-1)
      }, {
        transition: {
          duration: this.duration
        }
      })
    }
  ]
}
