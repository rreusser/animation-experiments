'use strict';

var plotter = require('../lib/d3-plotter');
var lorenz = require('../lib/lorenz');
var timer = require('../lib/timer');
var debug = require('../lib/debug');

module.exports = {
  name: 'Lorenz Attractor (D3)',

  setParticleCount: function (ev) {
    var n = parseInt(ev.target.value);
    n = isNaN(n) ? 0 : n;
    this.lorenz.initialize({n: n});
    this.plotter.updateData(0, this.lorenz.x, this.lorenz.x, this.lorenz.z);
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

    this.plotter = plotter()
      .initialize({
        xaxis: {
          bounds: [-20, 20],
          aspectRatio: 1,
        },
        yaxis: {
          bounds: [0, 40],
          at: -Infinity,
        }
      })
      .add({
        data: this.lorenz.x,
        x: this.lorenz.x,
        y: this.lorenz.z,
      })

    this.timer = timer()
      .onframe(function (frame, dt) {
        this.lorenz.compute();

        this.plotter.updateTraces(0);

        this.debug.tick();
      }.bind(this))
      .start();

    this.createControls();
  },

  actionLabel: 'Restart',

  action: function () {
    this.initializeY();
  },

  teardown: function () {
    this.plotter.destroy();
    this.timer.stop();
    this.debug.destroy();
    this.destroyControls();
  }
}
