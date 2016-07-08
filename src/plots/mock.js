'use strict';

var Plotly = require('plotly.js');

var mock = require('plotly.js/test/image/mocks/ternary_fill.json');

module.exports = {
    name: 'mock',
    plot: function (gd) {
        /*mock.data.push({
            x: [1, 2, 3],
            y: [3, 5, 6],
            type: 'scatter',
            xaxis: 'x',
            yaxis: 'y',
        });

        mock.data.push({
            r: [1, 2, 3],
            t: [1, 2, 3],
            type: 'scatter',
        });

        mock.data.push({
            values: [19, 26, 55],
            labels: ['Residential', 'Non-Residential', 'Utility'],
            type: 'pie'
        });*/

        mock.layout.width = window.innerWidth;
        mock.layout.height = window.innerHeight;

        Plotly.plot(gd, mock.data, mock.layout);
    },
}
