'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Toggle frames',

  frame1: [{x: [1, 2], y: [1, 1], key: ['a', 'b'], mode: 'markers', line: {color: 'red'}}],
  frame2: [{x: [1, 2], y: [1.5, 1.5], key: ['b', 'a'], mode: 'markers', line: {color: 'red'}}],

  plot: function (gd) {
    this.selected = this.frame1;
    Plotly.plot(gd, this.frame1, this.layout);
  },

  actionLabel: 'Toggle',

  action: function (gd) {
    this.selected = this.selected === this.frame1 ? this.frame2 : this.frame1;

    Plotly.animate(gd, this.selected, {duration: 500});
  }
}
