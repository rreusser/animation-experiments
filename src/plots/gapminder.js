'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
  name: 'Gapminder',

  plot: function (gd) {
    this.gd = gd;
    d3.json('data/gapminder-with-frames.json', function(err, d) {
      d.layout.sliders = [{
        active: 0, // 1,2,3 -> index of active step

        steps: d.frames.map(function(f) {
          return {
            method: 'animate',
            args: [[f.name], {
              mode: 'immediate',
              transition: {
                duration: 500
              },
              frame: {
                duration: 500,
                redraw: false
              }
            }],
            label: f.name
          }
        }),

        x: 0.1,
        len: 0.9,
        xanchor: 'left',
        y: -0.2,
        yanchor: 'top',

        updateevent: 'plotly_animatingframe',
        updatevalue: 'name',

        xpad: 0,
        ypad: 10,
      }];

      d.layout.updatemenus = [{
        x: 0.08,
        y: -0.22,
        yanchor: 'top',
        xanchor: 'right',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        buttons: [{
          method: 'animate',
          args: [null, {transition: {duration: 400, easing: 'quadratic-in-out'}, frame: {duration: 400, redraw: false}}],
          label: 'Play',
        }, /*{
          method: 'animate',
          args: [[], {mode: 'immediate'}],
          label: 'Pause',
        }*/]
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
