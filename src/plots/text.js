'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Text',

  plot: function (gd) {
    Plotly.plot(gd, [{
      x: [1, 2, 3],
      y: [0, 0, 0],
      mode: 'markers+text',
      text:['foo', 'bar', 'baz<br>test'],
      textposition: 'middle right',
    }], {
      xaxis: {
        range: [0.5, 3.5],
        autorange: false,
      },
      yaxis: {
        range: [-0.5, 2.5],
        autorange: false,
      }
    }).then(function() {
      Plotly.addFrames(gd, [{
        name: '1',
        data: [{
          y: [1, 1, 1],
          text: ['a', 'b', 'c<br>more text<br>even more']
        }]
      },{
        name: '2',
        data: [{
          y: [2, 2, 2],
          text: ['d', 'e<br>another line<br>svg text positioning 😬', 'f']
        }]
      }]);
    });
  },

  actionLabel: 'Animate',

  action: function (gd) {
    Plotly.animate(gd, null, {
      transition: {duration: 1000},
      frame: {duration: 1000},
      mode: 'immediate',
    });
  }
}
