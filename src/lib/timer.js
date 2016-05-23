'use strict';

module.exports = Timer;

function Timer () {
  if (!(this instanceof Timer)) return new Timer();

  this.frameCallbacks = [];
  this.raf = null;
  this.frameCounter = 0;

  return this;
};

Timer.prototype.onframe = function (cb) {
  this.frameCallbacks.push(cb);
  return this;
};

Timer.prototype.start = function () {
  var t0 = Date.now();

  var next = function () {
    var t1 = Date.now();

    // Queue the next right away so that callback may stop animation:
    this.raf = requestAnimationFrame(next);

    for (var i = 0; i < this.frameCallbacks.length; i++) {
      this.frameCallbacks[i](this.frameCounter, t1 - t0);
    }

    t0 = t1;
    this.frameCounter++;
  }.bind(this);

  this.raf = requestAnimationFrame(next);
  return this;
};

Timer.prototype.stop = function () {
  cancelAnimationFrame(this.raf);
  return this;
};
