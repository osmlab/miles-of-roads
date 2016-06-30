var tr = require('tile-reduce');
var path = require('path');

var total = 0;

tr({
    zoom: 12,
    map: path.join(__dirname, '/miles-of-roads.js'),
    sources: [{
        name: 'osm',
        mbtiles: process.argv[2],
        raw: false
    }]
}).on('reduce', function(result) {
    total += result;
}).on('end', function() {
    console.log(total);
});
