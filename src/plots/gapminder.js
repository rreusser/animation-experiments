'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
  name: 'Gapminder',

  plot: function (gd) {
    this.gd = gd;
    d3.json('data/gapminder-with-frames.json', function(err, d) {
      d.layout.updatemenus = [{
        x: 0.05,
        y: 1.05,
        yanchor: 'top',
        xanchor: 'right',

        buttons: d.frames.map(function(f) {
          console.log('f', f);
          return {
            method: 'animate',
            args: [[f.name], {transition: {duration: 500}, frame: {duration: 500, redraw: false}}],
            label: f.name
          }
        }).slice(0, 10)
      }, {
        x: 0.06,
        y: 1.05,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        type: 'buttons',
        buttons: [{
          method: 'animate',
          args: [null, {transition: {duration: 500}, frame: {duration: 500, redraw: false}}],
          label: 'Play',
        }]
      }];

      Plotly.plot(gd, d.data, d.layout, d.config).then(function() {
        Plotly.addFrames(gd, d.frames);
      });
    });
  },

  teardown: function () {
    this.gd.style.paddingTop = '50px';
  }
}
