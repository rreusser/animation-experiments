'use strict';

var Plotly = require('plotly.js');
var d3 = Plotly.d3;

module.exports = {
    name: 'Gapminder Simplified',

    plot: function (gd) {
        Plotly.plot(gd, {
            "data":[{
                "name":"Asia",
                "mode":"markers",
                "x":[
                    30.332, 53.832, 39.348, 41.366, 50.54896,
                    31.997, 56.923, 41.216, 43.415, 44.50136,
                    34.02, 59.923, 43.453, 45.415,
                    36.088, 63.3, 45.252, 40.317, 63.11888
                ],
                "y":[
                    820.8530296, 11635.79945, 661.6374577, 434.0383364, 575.9870009,
                    853.10071, 12753.27514, 686.3415538, 496.9136476, 487.6740183,
                    836.1971382, 14804.6727, 721.1860862, 523.4323142,
                    739.9811058, 18268.65839, 630.2336265, 421.6240257, 676.9000921
                ],
                "ids":[
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China"
                ],
                "text":[
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia",
                    "Afghanistan", "Bahrain", "Bangladesh", "Cambodia", "China"
                ],
                "marker":{
                    "sizemode":"area",
                    "sizeref":200000,
                    "size":[
                        9240934, 138655, 51365468, 5322536, 637408000,
                        10267083, 171863, 56839289, 6083619, 665770000,
                        11537966, 202182, 62821884, 6960067,
                        13079460, 230800, 70759295, 7450606, 862030000
                    ]
                },
                "transforms": [{
                    "type": "filter",
                    "target": [
                        "1957", "1957", "1957", "1957", "1957",
                        "1962", "1962", "1962", "1962", "1962",
                        "1967", "1967", "1967", "1967",
                        "1972", "1972", "1972", "1972", "1972"
                    ],
                    "operation": "{}",
                    "value": ["1952"]
                }, {
                    "type": "populate-slider",
                    "sliderindex": 0,
                    "framegroup": "frames-by-year",
                    "animationopts": {
                        "mode": "immediate",
                        "frame": {"redraw": false},
                        "transition": {"duration": 400}
                    }
                }]
            },
            {
                "name":"Europe",
                "mode":"markers",
                "x":[
                    55.23, 66.8, 68, 53.82, 59.6,
                    59.28, 67.48, 69.24, 58.45, 66.61,
                    66.22, 70.14, 70.94, 70.42,
                    67.69, 70.63, 71.44, 67.45, 70.9
                ],
                "y":[
                    1601.056136, 6137.076492, 8343.105127, 973.5331948, 2444.286648,
                    1942.284244, 8842.59803, 9714.960623, 1353.989176, 3008.670727,
                    2760.196931, 12834.6024, 13149.04119, 5577.0028,
                    3313.422188, 16661.6256, 16672.14356, 2860.16975, 6597.494398
                ],
                "ids":[
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria"
                ],
                "text":[
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bulgaria",
                    "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria"
                ],
                "marker":{
                    "sizemode":"area",
                    "sizeref":200000,
                    "size":[
                        1282697, 6927772, 8730405, 2791000, 7274900,
                        1476505, 6965860, 8989111, 3076000, 7651254,
                        1984060, 7376998, 9556500, 8310226,
                        2263554, 7544201, 9709100, 3819000, 8576200
                    ]
                },
                "transforms": [{
                    "type": "filter",
                    "target": [
                        "1952", "1952", "1952", "1952", "1952",
                        "1957", "1957", "1957", "1957", "1957",
                        "1967", "1967", "1967", "1967",
                        "1972", "1972", "1972", "1972", "1972"
                    ],
                    "operation": "{}",
                    "value": ["1952"]
                }, {
                    "type": "populate-slider",
                    "sliderindex": 0,
                    "framegroup": "frames-by-year",
                    "animationopts": {
                        "mode": "immediate",
                        "frame": {"redraw": false},
                        "transition": {"duration": 400}
                    }
                }]
            }],
            "layout":{
                "width": window.innerWidth,
                "height": window.innerHeight,
                "title": "Life Expectancy vs. GDP Per Capita",
                "xaxis":{
                    "autorange": false,
                    "range": [20, 80]
                },
                "yaxis":{
                    "type":"log",
                    "autorange": false,
                    "range": [2, 5]
                },
                "updatemenus": [{
                    "type": "buttons",
                    "transition": {"duration": 500},
                    "showactive": false,
                    "buttons": [{
                        "label": "Play",
                        "method": "animate",
                        "args": ["frames-by-year", {
                            "mode": "immediate",
                            "frame": {"duration": 500, "redraw": false},
                            "transition": {"duration": 500}
                        }]
                    }]
                }]
            }
        });
    }
};
