'use strict';

var Plotly = require('plotly.js');
var Lib = require('plotly.js/src/lib');

var mock = {
  data: [{
    x: [1.5],
    y: [1.5],
    mode: 'markers',
    marker: {color: 'blue'}
  }, {
    x: [1, 2],
    y: [1, 2],
    mode: 'markers',
    marker: {color: 'red'}
  }],
  layout: {},
  frames: [{
    name: '0',
    data: [{
      x: [1.9, 1.1],
      y: [1.9, 1.1],
    }],
    traces: [1]
  }, {
    name: '1',
    data: [{
      x: [1.1, 1.9],
      y: [1.1, 1.9],
    }],
    traces: [1]
  }]
};

module.exports = {
  name: 'Trace Indices',
  frame: 0,

  plot: function (gd) {
    var mockCopy = Lib.extendDeep({}, mock);

    Plotly.plot(gd, mockCopy.data, mockCopy.layout).then(function() {
      Plotly.addFrames(gd, mockCopy.frames);
    });
  },

  actionLabel: 'Animate',

  action: function (gd) {
    this.frame = (this.frame + 1) % 2;
    Plotly.animate(gd, [this.frame.toString()], {
      transition: {duration: 500},
      frame: {duration: 500}
    })
  }
}
