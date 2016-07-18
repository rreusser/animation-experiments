'use strict';

var Plotly = require('plotly.js');

var mock = require('plotly.js/test/image/mocks/scatter_fill_self_next.json');

module.exports = {
    name: 'mock',
    plot: function (gd) {
        mock.layout.width = window.innerWidth;
        mock.layout.height = window.innerHeight;

        Plotly.plot(gd, mock.data, mock.layout);
    },
}
