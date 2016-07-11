'use strict';

var Plotly = require('plotly.js');
var Lib = require('plotly.js/src/lib');
var d3 = require('d3');
var clone = require('clone');

module.exports = {
    name: 'Gapminder',
    idx: 0,

    byYear: {},
    initialYear: '1952',

    layout: {
        xaxis: {
            title: 'Life Expectancy',
            range: [30, 85],
        },
        yaxis: {
            title: 'GDP per Capita',
            type: 'log'
        },
        margin: {
            t: 20
        },
        hovermode: 'closest',
        slider: {
            visible: true,
            plotlycommand: 'animate',
            args: ['slider.value', {duration: 400, ease: 'cubic-in-out'}],
            initialValue: '1952',
        }
    },

    loadAndConvertToJSON: function (onload) {
        d3.tsv('data/gapminder-five-year.csv', onload)
            .row(function (d) {
                d.gdpPercap = parseFloat(d.gdpPercap);
                d.lifeExp = parseFloat(d.lifeExp);
                d.pop = parseFloat(d.pop);

                var year = this.byYear[d.year] = this.byYear[d.year] || [];
                var cont = year.find(function (x) { return x.name === d.continent; });

                if (!cont) {
                    cont = {};
                    year.push(cont)
                }

                cont.name = d.continent;
                cont.text = cont.text || [];
                cont.marker = cont.marker || {};
                cont.marker.sizemode = 'area';
                cont.marker.sizeref = 200000;
                cont.marker.size = cont.marker.size || [];
                cont.mode = 'markers';
                cont.x = cont.x || [];
                cont.y = cont.y || [];

                cont.marker.size.push(d.pop)
                cont.text.push(d.country)
                cont.x.push(d.lifeExp)
                cont.y.push(d.gdpPercap);
            }.bind(this));
    },

    onload: function (err, d) {
        if (err) {
            console.error(err);
            return;
        }

        this.frames = [];
        this.layout.slider.values = [];
        for (var key in this.byYear) {
            this.layout.slider.values.push(key);
            this.frames.push({
                data: this.byYear[key],
                name: key,
            });
        }

        this.createPlot(this.byYear[this.initialYear]).then(function() {
            Plotly.addFrames(this.gd, this.frames);
        }.bind(this)).then(function() {
            //this.createSlider();
        }.bind(this));
    },

    createPlot: function (data) {
        return Plotly.plot(
            this.gd,
            data.map(function(d) {
                return Lib.extendDeep({}, d);
            }),
            this.layout,
            { scrollZoom: true }
        );
    },

    plot: function (gd) {
        this.byYear = {};
        window.gd = this.gd = gd;
        this.loadAndConvertToJSON(this.onload.bind(this));
    },

    teardown: function() {
        this.container.remove();
    }
}
