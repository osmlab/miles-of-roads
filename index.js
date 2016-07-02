var tr = require('tile-reduce');
var path = require('path');
var fs = require('fs');
var scale = require('d3-scale');

var steps = 6;


min = 0;
max = process.argv[2];

// ---

var values = {};

scale = scale.scaleLog()
    .domain([1, steps])
    .range([min, max]);

for (var i = steps; i >= 0; i--) {
    if (i === 0) break;
    var previousMax = 0;
    var max = Math.floor(scale(i));
    values[i] = [previousMax, max];
}

console.log(JSON.stringify(values, null, 4));

return 

var total = 0;
var min = 0;
var max = 0;

if (!process.argv[2]) return console.log('you must specify an mbtiles');

tr({
    zoom: 12,
    map: path.join(__dirname, '/miles-of-roads.js'),
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
    var values = {};

    scale = scale.scaleLog()
        .domain([1, steps])
        .range([min, max]);

    for (var i = steps; i >= 0; i--) {
        values[i] = [];
    };

    var result = {
        min: min,
        max: max,
        total: total
    };

    console.log(JSON.stringify(result));
});
