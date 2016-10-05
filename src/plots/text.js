'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Text',

  plot: function (gd) {
    Plotly.plot(gd, [{
      x: [1, 2, 3],
      y: [1, 2, 3],
      mode: 'markers+text',
      text:['foo', 'bar', 'baz'],
      textposition: 'middle right',
    }], {
      xaxis: {
        range: [0.5, 3.5],
        autorange: false,
      }
    }).then(function() {
      Plotly.addFrames(gd, [{
        name: '1',
        data: [{
          y: [2, 1, 3],
          text: ['a', 'b', 'c']
        }]
      },{
        name: '2',
        data: [{
          y: [3, 1, 2],
          text: ['d', 'e', 'f']
        }]
      }]);
    });
  },

  actionLabel: 'Animate',

  action: function (gd) {
    Plotly.animate(gd, null, {
      transition: {duration: 1000},
      frame: {duration: 1000}
    });
  }
}
