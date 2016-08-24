'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
    name: 'Gapminder',

    plot: function (gd) {
        d3.json('data/gapminder-with-frames.json', function(err, d) {
            Plotly.plot(gd, d.data, d.layout, d.config).then(function() {
                Plotly.addFrames(gd, d.frames);
            });
        });
    },
}
