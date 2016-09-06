'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Frame animation',

  plot: function (gd) {
    var frames = [];
    for (var i = 0; i < 10; i++) {
      frames.push({
        name: 'frame' + i,
        group: i % 2 === 0 ? 'even' : 'odd',
        data: [{
          x: i % 2 === 0 ? [0, 2] : [1, 3],
          y: [i / 10, (i + 1) / 10]
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
        console.log('plotly_animating');
      });
      gd.on('plotly_animated', function () {
        console.log('plotly_animated');
      });
      gd.on('plotly_animationinterrupted', function () {
        console.log('plotly_animationinterrupted');
      });
    });
 },

  actionLabels: ['Evens (immediate)', 'Odds (afterall)', 'Evens (next)', 'Next frame (next)', 'Next frame (immediate)'],

  timing: 2000,
  index: 0,

  actions: [
    function (gd) {
      Plotly.animate(gd, 'even', {
          frame: {duration: this.timing},
          transition: {duration: this.timing * 0.9},
          mode: 'immediate'
        })
        .then(function() {
          console.log('even animation complete');
        }, function() {
          console.log('even animation interrupted');
        });
    },
    function (gd) {
      Plotly.animate(gd, 'odd', {
          frame: {duration: this.timing},
          transition: {duration: this.timing * 0.9},
          mode: 'afterall'
        })
        .then(function() {
          console.log('odd animation complete');
        }, function() {
          console.log('odd animation interrupted');
        });
    },
    function (gd) {
      Plotly.animate(gd, 'even', {
          frame: {duration: this.timing},
          transition: {duration: this.timing * 0.9},
          mode: 'next'
        })
        .then(function() {
          console.log('even animation complete');
        }, function() {
          console.log('even animation interrupted');
        });
    },
    function (gd) {
      this.index = (this.index + 1) % gd._transitionData._frames.length;
      Plotly.animate(gd, ['frame' + this.index], {
          frame: {duration: this.timing},
          transition: {duration: this.timing * 0.9},
          mode: 'next'
        })
        .then(function() {
          console.log('single frame complete');
        }, function() {
          console.log('single frame interrupted');
        });
    },
    function (gd) {
      this.index = (this.index + 1) % gd._transitionData._frames.length;
      Plotly.animate(gd, ['frame' + this.index], {
          frame: {duration: this.timing},
          transition: {duration: this.timing * 0.9},
          mode: 'immediate'
        })
        .then(function() {
          console.log('single frame complete');
        }, function() {
          console.log('single frame interrupted');
        });
    },
  ]
}
