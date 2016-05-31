'use strict';

var Plotly = require('plotly.js');
var d3 = require('d3');

module.exports = {
  name: 'Gapminder',
  idx: 0,

  byYear: {},

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
    hovermode: 'closest'
  },

  loadData: function (onload) {
    d3.tsv('../data/gapminder-five-year.csv', onload)
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
    this.doPlot('2007');
  },

  doPlot: function (year) {
    Plotly.plot(
      this.gd,
      this.byYear[year],
      this.layout,
      { scrollZoom: true }
    );
  },

  plot: function (gd) {
    window.gd = this.gd = gd;
    this.loadData(this.onload.bind(this));
  },

  actionLabel: 'Next year',

  action: function (gd) {
    var years = Object.keys(this.byYear);
    this.idx = (this.idx + 1) % years.length;
    var year = years[this.idx];

    Plotly.animate(this.gd, this.byYear[year], {duration: 500, easing: 'cubic-in-out'});
  }
}
