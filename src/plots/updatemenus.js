'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Updatemenus',

  plot: function (gd) {
    this.gd = gd;

    Plotly.plot(gd, [{ x: [1, 2, 3], y: [2, 1, 3]}
    ], {
      updatemenus: [
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.3,
          y: 1.0,
          yanchor: 'top',
          xanchor: 'left',
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.3,
          y: 0.66,
          yanchor: 'top',
          xanchor: 'left',
          orientation: 'h'
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.3,
          y: 0.33,
          yanchor: 'top',
          xanchor: 'left',
          orientation: 'h',
          openreverse: true,
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.3,
          y: 0.0,
          yanchor: 'top',
          xanchor: 'left',
          orientation: 'v',
          openreverse: true,
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          type: 'buttons',
          x: -0.12,
          y: 1.0,
          yanchor: 'top',
          xanchor: 'left',
          showactive: false,
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          type: 'buttons',
          x: -0.12,
          y: 1.01,
          yanchor: 'bottom',
          xanchor: 'left',
          orientation: 'h',
          showactive: false,
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          type: 'buttons',
          x: 1,
          y: 0.03,
          yanchor: 'bottom',
          xanchor: 'right',
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          type: 'buttons',
          x: 1,
          y: 0.02,
          yanchor: 'top',
          xanchor: 'right',
          orientation: 'h'
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.6,
          y: 0.9,
          yanchor: 'top',
          xanchor: 'right',
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.6,
          y: 0.9,
          yanchor: 'bottom',
          xanchor: 'left',
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          x: 0.6,
          y: 0.4,
          type: 'buttons',
          yanchor: 'top',
          xanchor: 'right',
        },
        {
          buttons: [
            {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
            {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
            {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
            {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
            {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
          ],
          type: 'buttons',
          x: 0.6,
          y: 0.4,
          yanchor: 'bottom',
          xanchor: 'left',
        },
      ]
    });
  },
  teardown: function () {
    this.gd.style.paddingTop = undefined;
  }
}
