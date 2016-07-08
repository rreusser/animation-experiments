'use strict';

var Plotly = require('plotly.js');

module.exports = {
    name: 'Subplot Removal',


    plot: function () {
        function plot () {
            return Plotly.plot(gd, [
                {y: [2,1,2]},
                {y: [3,2,1], xaxis: 'x2'}
            ], {
                xaxis: {domain: [0, 0.5]},
                xaxis2: {domain: [0.5, 1]},
            });
        }

        function updateTrace () {
            return Plotly.restyle(gd, {xaxis: ['y']}, [1]);
        }

        function updateLayout () {
            return Plotly.relayout(gd, {xaxis2: {}})
        }

        plot()
            .then(updateTrace)
            .then(updateLayout)
    }
};
