'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Annotations',

  plot: function (gd) {
    var frames = [];
    var sliders = [{
      steps: [],
      y: 0,
      currentvalue: {
        visible: false
      },
      yanchor: 'top',
      pad: {t: 20}
    }];
    for (var i = 0; i < 4; i++) {
      var y = [Math.random(), Math.random(), Math.random()];
      var name = 'frame' + i;
      frames.push({
        name: name,
        data: [{
          y: y
        }],
        layout: {
          'annotations[0].y': y[2],
          'annotations[0].text': 'test' + i
        }
      });

      sliders[0].steps.push({
        label: name,
        method: 'animate',
        args: [[name], {mode: 'immediate'}]
      })
    }

    Plotly.plot(gd,
      [{
        x: [1, 2, 3],
        line: {
          simplify: false
        }
      }],
      {
        margin: {
          t: 20,
          l: 30,
          r: 20,
        },
        annotations: [
          {
            x: 3,
            y: 2,
            xref: 'x',
            yref: 'y',
            text: 'test0',
            showarrow: true,
            ax: 0,
            ay: -40
          },
        ],
        sliders: sliders,
        xaxis: {range: [0, 4]},
        yaxis: {range: [0, 4]}
      }
    ).then(function() {
      return Plotly.addFrames(gd, frames);
    });
 },

  actionLabels: ['Animate'],

  timing: 2000,
  index: 0,

  actions: [
    function (gd) {
      Plotly.animate(gd, null, {
        frame: {
          redraw: true
        }
      });
    }
  ]
};
