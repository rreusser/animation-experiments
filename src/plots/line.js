'use strict';

var Plotly = require('plotly.js');

module.exports = function (id) {
  Plotly.newPlot(id, [{
    x: [1, 2, 3],
    y: [3, 3, 1],
    mode: 'lines',
    type: 'scatter',
  }])
};
