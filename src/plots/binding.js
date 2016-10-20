'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Binding',

  plot: function (gd) {
    Plotly.plot(gd, [
      {
        x: [1, 2, 3],
        y: [2, 1, 3],
        mode: 'markers+lines',
        marker: {
          color: 'red',
        },
        line: {
            simplify: false
        }
      }
    ], {
      legend: {
        xanchor: 'right',
        x: -0.2,
        y: -0.2,
        yanchor: 'top',
      },
      margin: {
        pad: 10,
      },
      updatemenus: [{
        active: 0, // 1,2,3 -> index of active step
        type: 'buttons',
        direction: 'right',
        buttons: [
          {method: 'restyle', args: ['marker.color', 'red', [0]], label: 'R'},
          {method: 'restyle', args: ['marker.color', 'orange', [0]], label: 'O'},
          {method: 'restyle', args: ['marker.color', 'yellow', [0]], label: 'Y'},
          {method: 'restyle', args: ['marker.color', 'green', [0]], label: 'G'},
          {method: 'restyle', args: ['marker.color', 'blue', [0]], label: 'B'},
          {method: 'restyle', args: ['marker.color', 'purple', [0]], label: 'V'},
        ],

        visible: true,  // or false
        x: 0,
        xanchor: 'left',
        y: 1,
        yanchor: 'top',

        xpad: 20,
        ypad: 30,

      }],
      sliders: [{
        active: 0, // 1,2,3 -> index of active step

        steps: [
          {method: 'restyle', args: ['marker.color', 'red', [0]], label: 'R'},
          {method: 'restyle', args: ['marker.color', 'orange', [0]], label: 'O'},
          {method: 'restyle', args: ['marker.color', 'yellow', [0]], label: 'Y'},
          {method: 'restyle', args: ['marker.color', 'green', [0]], label: 'G'},
          {method: 'restyle', args: ['marker.color', 'blue', [0]], label: 'B'},
          {method: 'restyle', args: ['marker.color', 'purple', [0]], label: 'V'},
        ],

        visible: true,  // or false
        x: 0,
        xanchor: 'left',
        y: -0.2,
        yanchor: 'top',

        xpad: 20,
        ypad: 30,

      }]
    });
  },
}
