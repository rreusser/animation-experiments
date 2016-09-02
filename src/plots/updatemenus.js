'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Updatemenus',

  plot: function (gd) {
    this.gd = gd;

    gd.style.paddingTop = '50px';
    Plotly.plot(gd, [{ x: [1, 2, 3], y: [2, 1, 3]}
    ], {
      updatemenus: [{
        buttons: [
          {label: 'red', method: 'restyle', args: ['marker.color', 'red']},
          {label: 'blue', method: 'restyle', args: ['marker.color', 'blue']},
          {label: 'green', method: 'restyle', args: ['marker.color', 'green']},
          {label: 'yellow', method: 'restyle', args: ['marker.color', 'yellow']},
          {label: 'orange', method: 'restyle', args: ['marker.color', 'orange']},
        ]
      }]
    });
  },
  teardown: function () {
    this.gd.style.paddingTop = undefined;
  }
}
