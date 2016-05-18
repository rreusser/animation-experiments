'use strict';

var Plotly = require('plotly.js');

module.exports = function (id) {
  Plotly.newPlot(id, [{
    x: [1, 2, 3],
    y: [2, 1, 4],
    mode: 'markers',
    type: 'scatter',
  }])
};
