'use strict';

var d3 = require('d3');

module.exports = Debugger;

function Debugger () {
  if (!(this instanceof Debugger)) return new Debugger();

  var debugEl = document.createElement('pre');
  debugEl.id = 'debug';
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(debugEl);

  return {
    accum: 0,
    reportingInterval: 60,

    tick: function () {
      if (this.accum++ % this.reportingInterval === 0) {
        this.reportFPS();
      }
    },

    reportFPS: function () {
      if (!this.t0) {
        this.t0 = Date.now();
      } else {
        this.t1 = Date.now();
        this.print('fps: ' + (1000 / (this.t1 - this.t0) * this.reportingInterval).toFixed(2));
        this.t0 = this.t1;
      }
    },

    print: function (str) {
      debugEl.textContent = str;
    },

    destroy: function () {
      debugEl.remove();
    }
  };
}
