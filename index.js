var tr = require('tile-reduce');
var path = require('path');
var fs = require('fs');

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
    var result = {
        min: min,
        max: max,
        steps: steps
        total: total
    };
    console.log(JSON.stringify(result));
});
