'use strict';

var d3 = require('plotly.js').d3;
var plotter = require('../lib/d3-plotter');
var timer = require('../lib/timer');
var debug = require('../lib/debug');

window.d3 = d3;

window.plot = module.exports = {
  name: 'Line Join (D3)',
  keyCnt: 0,

  delay: 500,

  nextKey: function () {
    return this.keyCnt++;
  },

  plot: function (gd) {
    var i;
    this.x = [1, 0, -1, 0, 1];
    this.y = [0, 1, 0, -1, 0];
    this.keys = [];

    for (i = 0; i < this.x.length; i++) {
      this.keys[i] = this.nextKey();
    }

    for (i = 0; i < this.x.length; i++) {
      var x = this.x[i];
      var y = this.y[i];
      var r = this.radFunc(x, y);
      this.x[i] *= r;
      this.y[i] *= r;
    }

    this.xAccessor = function (d, i) {
      return this.plotter.xScale(this.x[i]);
    }.bind(this);

    this.yAccessor = function (d, i) {
      return this.plotter.yScale(this.y[i]);
    }.bind(this);

    this.makeline = d3.svg.line().x(this.xAccessor).y(this.yAccessor);

    this.plotter = plotter()
      .initialize({
        xaxis: {bounds: [-1.5, 1.5], aspectRatio: 1},
        yaxis: {bounds: [-1.5, 1.5]}
      })
      .add({
        data: this.keys,
        x: this.x,
        y: this.y,
        keys: true,
      })

    /*d3.select('.trace').append('g').classed('line', true)
      .data([this.x])
        .append('path')
        .attr('d', this.makeline)
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', 1)*/
  },

  radFunc: function (x, y) {
    var th = Math.atan2(y, x);
    var zero = Math.abs(th)  < 1e-4 || Math.abs(th - 2 * Math.PI) < 1e-4;
    return 1 + 0.5 * (Math.sin(th * 5.0) + 0.1 * Math.sin(th * 10.0));
  },

  addPoints: function (n) {
    n = n || 1;
    //console.log('n:', n);
    var i;
    var idx = 0;
    var rmax = 0;
    for (i = 0; i < this.x.length - 1; i++) {
      var x1 = this.x[i];
      var x2 = this.x[i + 1];
      var y1 = this.y[i];
      var y2 = this.y[i + 1];
      var r = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      if (r > rmax) {
        idx = i;
        rmax = r;
      }
    }
    idx++;

    var x1 = this.x[idx - 1];
    var x2 = this.x[idx];
    var y1 = this.y[idx - 1];
    var y2 = this.y[idx];

    for (var i = n - 1; i >= 0; i--) {
      var t = (i + 1) / (n + 1);
      var xm = x1 + t * (x2 - x1);
      var ym = y1 + t * (y2 - y1);

      var r = Math.sqrt(xm * xm + ym * ym);
      xm /= r;
      ym /= r;

      var d = this.radFunc(xm, ym);
      xm *= d;
      ym *= d;

      this.x.splice(idx, 0, xm);
      this.y.splice(idx, 0, ym);
      this.keys.splice(idx, 0, this.nextKey());
    }

    this.plotter.updateData(0, this.keys, this.x, this.y, this.delay);
  },

  removePoints: function (n) {
    n = n || 1;
    if (this.x.length < 5) return;
    var i;
    var idx = 0;
    var rmin = Infinity;
    for (i = this.x.length - n - 1; i >= 1; i--) {
      var x1 = this.x[i];
      var x2 = this.x[i + 1];
      var y1 = this.y[i];
      var y2 = this.y[i + 1];
      var r = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      if (r < rmin) {
        idx = i;
        rmin = r;
      }
    }

    for (var i = 0; i < n; i++) {
      this.x.splice(idx, 1);
      this.y.splice(idx, 1);
      this.keys.splice(idx, 1);
    }

    this.plotter.updateData(0, this.keys, this.x, this.y, this.delay);
  },

  actionLabels: ['Add Point', 'Remove Point'],

  actions: [
    function () {
      this.addPoints(Math.floor(1 + Math.random() * 8));
    },
    function () {
      this.removePoints(Math.floor(1 + Math.random() * 8));
    }
  ],

  destroyControls: function () {
    var controls = document.getElementById('actions');
    controls.innerHTML = '';
  },

  teardown: function () {
    this.plotter.destroy();
    this.destroyControls();
  }
};

