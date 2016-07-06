var tr = require('tile-reduce');
var path = require('path');
var fs = require('fs');
var scale = require('d3-scale');

min = 0;
max = process.argv[2];

var steps = 6;
var total = 0;
var min = 0;
var max = 0;

if (!process.argv[2]) return console.log('you must specify an mbtiles');

tr({
    zoom: 12,
    map: path.join(__dirname, '/miles-of-roads.js'),
    bbox: [-120.176697, 32.775729, -115.573425, 34.955744],
    output: fs.createWriteStream('tilemap.ldgeojson'),
    sources: [{
        name: 'osm',
        mbtiles: process.argv[2]
    }]
}).on('reduce', function(result) {
    if (result > max) max = result;
    if (result < min) min = result;
    total += result;
}).on('end', function() {
    var result = {
        min: min,
        max: max,
        total: total,
        scale: calculateScale(steps, min, max)
    };

    console.log(JSON.stringify(result, null, 4));
});

function calculateScale(steps, min, max) {
    var values = {};

    scale = scale.scaleLog()
        .domain([1, (steps+1)])
        .range([min, max]);

    console.log(scale(2));

    var previousMax = 0;
    for (var i = 0; i <= steps; i++) {
        if (i !== 0) {
            var max = Math.floor(scale(i+1));
            values[i] = [previousMax, max];
            previousMax = max;
        }
    }

    return values;
}
