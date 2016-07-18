'use strict';

var Plotly = require('plotly.js');

module.exports = {
    name: 'tozero',

    plot: function(gd) {
        Plotly.plot(gd, [
            {
                x: [0, 2],
                y: [0.5, 0.4],
                type: 'scatter',
                fill: 'tozeroy',
                mode: 'lines+markers'
            },
            {
                x: [0, 2],
                y: [1, 1],
                type: 'scatter',
                fill: 'tonexty',
                mode: 'lines+markers'
            },
        ]);
    }
};
