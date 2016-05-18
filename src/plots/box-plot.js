'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Box Plot',

  plot: function (gd) {
    var y0 = [], y1 = [];
    for (var i = 0; i < 50; i ++) {
      y0[i] = Math.random();
      y1[i] = Math.random() + 1;
    }

    var trace1 = {
      y: y0,
      type: 'box'
    };

    var trace2 = {
      y: y1,
      type: 'box'
    };

    Plotly.newPlot(gd, [trace1, trace2]);
  }
};
