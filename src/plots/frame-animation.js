'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Frame animation',

  plot: function (gd) {
    var frames = [];
    for (var i = 0; i < 20; i++) {
      frames.push({
        name: 'frame' + i,
        group: i % 2 === 0 ? 'even' : 'odd',
        data: [{
          x: i % 2 === 0 ? [0, 2] : [1, 3],
          y: [Math.random(), Math.random()]
        }]
      });
    }

    Plotly.plot(gd,
      [{x: frames[0].data[0].x.slice(), y: frames[0].data[0].y.slice()}],
      {
        xaxis: {range: [0, 3]},
        yaxis: {range: [0, 1]}
      }
    ).then(function() {
      return Plotly.addFrames(gd, frames);
    }).then(function() {
      gd.on('plotly_animating', function () {
        console.log('animating...');
      });
      gd.on('plotly_animated', function () {
        console.log('animated!');
      });
    });
 },

  actionLabels: ['Evens', 'Odds'],

  actions: [
    function (gd) {
      Plotly.animate(gd, 'even', {frameduration: 200, duration: 100});
    },
    function (gd) {
      Plotly.animate(gd, 'odd', {frameduration: 200, duration: 100});
    }
  ]
}