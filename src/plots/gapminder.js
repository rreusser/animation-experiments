'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
  name: 'Gapminder',

  plot: function (gd) {
    this.gd = gd;
    d3.json('data/gapminder-with-frames.json', function(err, d) {
      d.layout.updatemenus = [{
        y: 1.1,
        yanchor: 'top',

        buttons: d.frames.map(function(f) {
          return {
            method: 'restyle',
            args: [[f.name]],
            label: f.name
          }
        }).slice(0, 10)
      }];

      Plotly.plot(gd, d.data, d.layout, d.config).then(function() {
        //Plotly.addFrames(gd, d.frames);
      });
    });
  },

  teardown: function () {
    this.gd.style.paddingTop = '50px';
  }
}
