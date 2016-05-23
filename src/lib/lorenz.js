'use strict';

module.exports = Lorenz;

function Lorenz () {
  if (!(this instanceof Lorenz)) return new Lorenz();

  return {
    n: 0,
    x: [],
    y: [],
    z: [],

    initialize: function (opts) {
      var opts = opts || {};
      this.t = 0;
      this.dt = 0.01;
      var newN = opts.n;

      if (opts.n < this.n) {
        this.x = this.x.slice(0, opts.n);
        this.y = this.y.slice(0, opts.n);
        this.z = this.z.slice(0, opts.n);
      }

      for (var i = this.n; i < opts.n; i++) {
        var t = i / (opts.n - 1)
        this.x[i] = 10 + Math.random()
        this.y[i] = 0
        this.z[i] = 20
      }

      this.n = opts.n;

      return this;
    },

    compute: function () {
      var s = 10, b = 8/3, r = 28;
      var dx, dy, dz;
      this.t += this.dt;
      var xh, yh, zh;
      for (var i = 0; i < this.n; i++) {
        dx = s * (this.y[i] - this.x[i]);
        dy = this.x[i] * (r - this.z[i]) - this.y[i];
        dz = this.x[i] * this.y[i] - b * this.z[i];

        xh = this.x[i] + dx * this.dt * 0.5;
        yh = this.y[i] + dy * this.dt * 0.5;
        zh = this.z[i] + dz * this.dt * 0.5;

        dx = s * (yh - xh);
        dy = xh * (r - zh) - yh;
        dz = xh * yh - b * zh;

        this.x[i] += dx * this.dt;
        this.y[i] += dy * this.dt;
        this.z[i] += dz * this.dt;
      }
    },
  };
}
