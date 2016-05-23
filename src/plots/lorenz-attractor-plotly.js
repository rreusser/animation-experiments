'use strict';

var Plotly = require('plotly.js');
var lorenz = require('../lib/lorenz');
var timer = require('../lib/timer');
var debug = require('../lib/debug');

module.exports = {
  name: 'Lorenz Attractor (Plotly)',

  setParticleCount: function (ev) {
    var n = parseInt(ev.target.value);
    n = isNaN(n) ? 0 : n;
    this.lorenz.initialize({n: n});
    //this.timer.stop();
    Plotly.restyle(this.gd, {x: [this.lorenz.x], y: [this.lorenz.z]}, [0]).then(function () {
      //this.timer.start();
    }.bind(this));
  },

  createControls: function () {
    var controls = document.getElementById('plot-controls');

    var field = document.createElement('div');
    field.className = 'input-field';

    var label = document.createElement('label')
    label.textContent = 'Particles: '
    label.for = 'particle-count'

    var input = document.createElement('input')
    input.type = 'number';
    input.id = 'particle-count';
    input.value = this.lorenz.n;

    input.addEventListener('change', this.setParticleCount.bind(this));
    input.addEventListener('keyup', this.setParticleCount.bind(this));

    field.appendChild(label);
    field.appendChild(input);
    controls.appendChild(field);
  },

  destroyControls: function () {
    var controls = document.getElementById('plot-controls');
    controls.innerHTML = '';
  },


  plot: function (gd) {
    this.debug = debug();
    this.lorenz = lorenz().initialize({n: 500});

    this.gd = gd;

    Plotly.plot(gd, [
      {
        x: this.lorenz.x,
        y: this.lorenz.z,
        mode: 'markers',
      }
    ], {
      xaxis: {
        range: [-30, 30],
        autorange: false,
      },
      yaxis: {
        range: [0, 40],
        autorange: false,
      },
    }, {scrollZoom: true});

    this.timer = timer()
      .onframe(function (frame, dt) {
        this.lorenz.compute();

        Plotly.animate(this.gd, [{x: this.lorenz.x, y: this.lorenz.z}], {duration: 0}, [0]);

        this.debug.tick();
      }.bind(this))
      .start();

    this.createControls();
  },

  // actionLabel: 'Restart',
  // action: function () { },

  teardown: function () {
    this.timer.stop();
    this.destroyControls();
    this.debug.destroy();
  }
}
