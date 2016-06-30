var tr = require('tile-reduce');
var path = require('path');
var fs = require('fs');

var total = 0;

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
    total += result;
}).on('end', function() {
    var result = {
        total: total
    };
    console.log(JSON.stringify(result));
});
