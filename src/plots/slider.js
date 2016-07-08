'use strict';

var Plotly = require('plotly.js');
var Lib = require('plotly.js/src/lib');

var mock = require('plotly.js/test/image/mocks/animation.json');

module.exports = {
    name: 'Slider',

    createSlider: function() {
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.min = 0;
        this.slider.max = gd._frameData._frames.length - 1;
        this.slider.step = 1;
        this.slider.value = 0;

        this.slider.style.position = 'absolute';
        this.slider.style.zIndex = 1000;
        this.slider.style.bottom = '10px';
        this.slider.style.left = '20px';

        this.slider.oninput = this.onChange.bind(this);

        document.body.appendChild(this.slider);
    },

    onChange: function() {
        var frameNum = parseInt(this.slider.value);
        var frameName = this.gd._frameData._frames[frameNum].name;

        Plotly.animate(gd, frameName);
    },

    plot: function (gd) {
        this.gd = gd;
        Plotly.plot(gd,
            mock.data,
            mock.layout,
            {scrollZoom: true}
        ).then(function() {
            Plotly.addFrames(gd,mock.frames)
        }).then(function() {
            this.createSlider();
            this.onChange();
        }.bind(this));
    },
};
