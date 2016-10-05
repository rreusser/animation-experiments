'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
  name: 'Sievert 1',

  plot: function (gd) {
    this.gd = gd;
    d3.json('data/gapminder-2.json', function(err, d) {
      console.log('err:', err);
      Plotly.plot(gd, d.data, d.layout, d.config).then(function() {
        Plotly.addFrames(gd, d.frames);
      });
    });
  },

  actionLabel: 'Animate',

  action: function (gd) {
    Plotly.animate(gd, null, {
      frame: {duration: 500, redraw: true},
      transition: {duration: 500}
    });
  }
}
