'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Menu',

  plot: function (gd) {
    document.getElementById('plot').style.paddingTop = '50px';
    var n = 100;

    var frames = [
      {name: 'sine', data: [{x: [], y: []}]},
      {name: 'cosine', data: [{x: [], y: []}]},
      {name: 'circle', data: [{x: [], y: []}]},
    ];

    for (var i = 0; i < n; i++) {
      var t = i / (n - 1) * 2 - 1;

      // A sine wave:
      frames[0].data[0].x[i] = t;
      frames[0].data[0].y[i] = Math.sin(t * Math.PI * 2);

      frames[1].data[0].x[i] = t;
      frames[1].data[0].y[i] = Math.cos(t * Math.PI * 2);

      // A circle:
      frames[2].data[0].x[i] = Math.sin(t * Math.PI);
      frames[2].data[0].y[i] = Math.cos(t * Math.PI);
    }

    Plotly.plot(gd, [{
      x: frames[0].data[0].x,
      y: frames[0].data[0].y,
      line: {simplify: false},
    }], {
      updatemenus: [{
        buttons: [
          {method: 'animate', args: [['sine']], label: 'sine'},
          {method: 'animate', args: [['cosine']], label: 'cosine'},
          {method: 'animate', args: [['circle']], label: 'circle'}
        ]
      }]
    }).then(function() {
      Plotly.addFrames(gd, frames);
    });
  }
}
