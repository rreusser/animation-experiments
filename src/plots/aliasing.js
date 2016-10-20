'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Aliasing',

  plot: function (gd) {
    var z = [];
    for(var x = 0; x < 1000; x++) {
      z.push(new Array(1000));
      for (var y = 0; y < 1000; y++) {
        z[x][y] = ((x+y) % 10 > 0) ? null : 100 + Math.sin(x*y) * 50;
      }
    }

    var data = [
      {
        z: z,
        type: 'heatmap',
        zsmooth: 'best',
      }
    ];

    var layout = {
      width: 500,
      height: 500
    }

    Plotly.plot(gd, data, layout, { scrollZoom: true });
 },
}
