'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Subplot scatter',

  plot: function (gd) {
    Plotly.plot(gd, [
      {
        x: [1, 2, 3],
        y: [3, 2, 1]
      },
      {
        x: [1, 2, 3],
        y: ['2.2', '1.2', 4.2],
        xaxis: 'x2',
        yaxis: 'y2'
      },
    ], {
      xaxis: {
        domain: [0, 0.45],
      },
      yaxis: {
        domain: [0, 0.45],
      },
      xaxis2: {
        domain: [0.55, 1],
        anchor: 'y'
      },
      yaxis2: {
        domain: [0.55, 1],
        anchor: 'x2',
      },
    }, {scrollZoom: true});

  },

  actionLabel: 'Animate',

  action: function (gd) {
    Plotly.animate(gd, {
      data: [
        {y: [
          '2.2',
          1.7 + Math.random(),
          3.5 + Math.random()
        ]}
      ],
      traces: [1]
    }, {
      transition: {
        duration: 500
      }
    });
  }
}
