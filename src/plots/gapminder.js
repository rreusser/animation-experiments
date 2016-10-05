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
                duration: 300
              },
              frame: {
                duration: 300,
                redraw: false
              }
            }],
            label: f.name
          }
        }),

        x: 0.1,
        len: 0.9,
        xanchor: 'left',
        y: 0,
        yanchor: 'top',

        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {
            size: 20,
          }
        },

        updateevent: 'plotly_animatingframe',
        updatevalue: 'name',

        transition: {duration: 300, easing: 'cubic-in-out'},

        font: {},

        pad: {
          t: 50,
          r: 0,
          b: 10,
          l: 0,
        }
      }];

      d.layout.updatemenus = [{
        x: 0.1,
        y: 0,
        yanchor: 'top',
        xanchor: 'right',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {
          t: 87,
          r: 10,
        },
        buttons: [{
          method: 'animate',
          args: [null, {transition: {duration: 300, easing: 'quadratic-in-out'}, frame: {duration: 500, redraw: false}}],
          label: 'Play',
        }]
      }];

      Plotly.plot(gd, d.data, d.layout, d.config).then(function() {
        Plotly.addFrames(gd, d.frames);
      });
    });
  },
}
