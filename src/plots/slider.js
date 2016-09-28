'use strict';

var Plotly = require('plotly.js');

module.exports = {
  name: 'Slider',

  plot: function (gd) {
    Plotly.plot(gd, [
      {
        x: [1, 2, 3],
        y: [2, 1, 3],
        mode: 'markers+lines',
        line: {
            simplify: false
        }
      }
    ], {
      legend: {
        xanchor: 'right',
        x: -0.2,
        y: 1,
        yanchor: 'top',
      },
      margin: {
        pad: 10,
      },
      sliders: [
        {
          active: 0, // 1,2,3 -> index of active step

          steps: [
            {method: 'animate', args: [], label: '1970'},
            {method: 'animate', args: [], label: '1971'},
            {method: 'animate', args: [], label: '1972'},
            {method: 'animate', args: [], label: '1973'},
            {method: 'animate', args: [], label: '1974'},
            {method: 'animate', args: [], label: '1975'},
            {method: 'animate', args: [], label: '1976'},
            {method: 'animate', args: [], label: '1977'},
          ],

          visible: true,  // or false
          x: 0,
          xanchor: 'left',
          y: -0.1,
          yanchor: 'top',

          xpad: 20,
          ypad: 30,

          font: {},
          borderwidth: 0,
          bordercolor: '#eee',
          color: '#BEC8D9',

          ticks: '',
          ticklen: '',
          tickcolor: ''
        },
        /*{
          active: 0, // 1,2,3 -> index of active step

          steps: [
            {method: 'animate', args: [], label: 'pos1'},
            {method: 'animate', args: [], label: 'pos2'},
            {method: 'animate', args: [], label: 'pos3'},
            {method: 'animate', args: [], label: 'pos4'},
          ],

          visible: true,  // or false
          x: 0.5,
          xanchor: 'center',
          y: -0.1,
          yanchor: 'top',

          font: {},
          borderwidth: 0,
          bordercolor: '#eee',
          color: '#BEC8D9',

          ticks: '',
          ticklen: '',
          tickcolor: ''
        }*/
      ]
    });
  },
}
