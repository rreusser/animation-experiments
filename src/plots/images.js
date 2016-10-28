'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Images',

  plot: function (gd) {
    var frames = [];
    var sliders = [{
      steps: [],
      y: 0,
      currentvalue: {
        visible: true,
        prefix: 'Emotion: ',
      },
      yanchor: 'top',
      pad: {t: 20}
    }];

    var labels = [
      'Afraid',
      'Afraid',
      'Afraid',
      'Maybe a little curious',
      'Happy',
      'Happy',
      'Happy',
      'Happy',
      'Happy',
      'Happy',
      'Happy',
      'Happy',
    ];

    for (var i = 0; i < 11; i++) {
      var name = 'frame' + i;
      frames.push({
        name: name,
        layout: {
          'images[0].source': 'https://s3.amazonaws.com/images.rickyreusser.com/cat2/cat-' + i + '.jpg',
        }
      });

      sliders[0].steps.push({
        label: labels[i],
        method: 'animate',
        args: [[name], {mode: 'immediate', frame: {redraw: true, duration: 0}, transition: {duration: 0}}]
      })
    }

    Plotly.plot(gd,
      [{
        x: [0],
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
        images: [
          {
            x: 0,
            y: 0,
            xref: 'xaxis',
            yref: 'yaxis',
            xanchor: 'left',
            yanchor: 'bottom',
            sizex: 1,
            sizey: 1,
            source: 'https://s3.amazonaws.com/images.rickyreusser.com/cat2/cat-0.jpg',
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
