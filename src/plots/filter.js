'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Filter',

  plot: function (gd) {
    Plotly.plot(gd, [{
      x: [1, 2, 3],
      y: [1, 2, 4],
      ids: ['a', 'a', 'b'],
      transforms: [{
        type: 'filter',
        filtersrc: 'ids',
        operation: '{}',
        value: ['a']
      }]
    }], {
      sliders: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        pad: {t: 20},
        steps: [{
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['a']}]}],
          label: 'a'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['b']}]}],
          label: 'b'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['c']}]}],
          label: 'c'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['d']}]}],
          label: 'd'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['e']}]}],
          label: 'e'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['f']}]}],
          label: 'f'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['g']}]}],
          label: 'g'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['h']}]}],
          label: 'h'
        }, {
          method: 'animate',
          args: [{data: [{'transforms[0].value': ['i']}]}],
          label: 'i'
        }]
      }],
      xaxis: {
        range: [0, 4],
        autorange: false
      },
      yaxis: {
        range: [0, 5],
        autorange: false
      }
    });
  },
}
