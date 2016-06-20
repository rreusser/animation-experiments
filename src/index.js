'use strict';

var body = document.getElementsByTagName('body')[0];
var selector = document.getElementById('selector');
var plot = document.getElementById('plot');
var parameterize = require('parameterize');

window.Plotly = require('plotly.js');

var plotHandlers = require('./plots');

var plotHandlerIndex = {};
var handler;

function setPlotType (plotType) {
  Plotly.purge(plot);

  if (handler && handler.teardown) {
    handler.teardown();
  }

  var newPlot = document.createElement('div');
  newPlot.id = 'plot';

  body.replaceChild(newPlot, plot);
  plot = newPlot;
  window.gd = newPlot;

  handler = plotHandlerIndex[plotType];

  window.location.hash = parameterize(handler.name)

  if (handler.plot) {
    handler.plot(document.getElementById(plot.id));
  } else {
    console.error('Plot handler not found for plot type:', plotType);
  }

  if (handler.action) {
    handler.actions = [handler.action];
    handler.actionLabels = [handler.actionLabel];
  }

  var actions = document.getElementById('actions');
  actions.innerHTML = '';

  if (handler.actions) {
    for (var i = 0; i < handler.actions.length; i++) {
        var button = document.createElement('button');
        (function (ii) {
          button.addEventListener('click', function () {
              handler.actions[ii].bind(handler)(plot);
          });
        }(i));
        actions.appendChild(button);

        button.style.display = 'inline-block';
        button.textContent = handler.actionLabels[i] || 'Perform action';
    }
  }
}

function createSelector () {
  var selector = document.getElementById('selector');

  var plotTypes = plotHandlers.map(function (handler, i) {
    return handler.name || ('Plot #' + i);
  });

  for (var i = 0; i < plotTypes.length; i++) {
    var plotType = plotTypes[i];

    var key = parameterize(plotType);

    plotHandlerIndex[key] = plotHandlers[i];
    var option = document.createElement('option');
    option.value = key;
    option.textContent = plotType

    selector.appendChild(option);
  }
}

window.onload = function () {
  createSelector();

  if (window.location.hash) {
    var key = window.location.hash.replace(/^#/,'')
    setPlotType(key);
    document.getElementById('selector').value = key;
  } else {
    setPlotType(selector.options[selector.selectedIndex].value);
  }

  document.getElementById('controls').style.display = 'block'
};

selector.addEventListener('change', function () {
  var option = selector.options[selector.selectedIndex].value;
  setPlotType(option);
});
