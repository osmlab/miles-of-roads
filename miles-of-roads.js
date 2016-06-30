var cheapRuler = require('cheap-ruler');

module.exports = function (sources, tile, write, done) {
    var ruler = cheapRuler.fromTile(tile[1], tile[2], 'miles');

    var blacklist = [
        'footway',
        'cycleway',
        'steps',
        'bridleway',
        'path',
        'track',
        'pedestrian'
    ];

    var miles = 0;

    var osm = sources.osm.osm;
    osm.features.filter(function(feature) {
        return blacklist.indexOf(feature.properties.highway) > -1;
    }).forEach(function(road) {
        miles += ruler.lineDistance(road.geometry.coordinates);
    });

    if (miles) write(miles + '\n');

    done(null, {
        tile: tile,
        miles: miles
    });
};
