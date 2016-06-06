'use strict';

var Plotly = require('plotly.js');
var shuffle = require('fisher-yates/inplace');

module.exports = {
  name: 'Object Constancy',

  n: 4,
  x: [],
  y: [],
  keys: [],

  plot: function (gd) {
    Plotly.plot(gd, this.getFrame(), this.layout);
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
      key: this.keys,
      mode: 'markers',
    }]
  },

  actionLabels: ['Shuffle and append', 'Shuffle and remove'],

  actions: [
    function (gd) {Plotly.animate(gd, this.getFrame(1), {duration: 500});},
    function (gd) {Plotly.animate(gd, this.getFrame(-1), {duration: 500});}
  ]
}
