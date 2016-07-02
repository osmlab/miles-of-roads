var cheapruler = require('cheap-ruler');
var tilebelt = require('tilebelt');

module.exports = function (sources, tile, write, done) {
    var ruler = cheapruler.fromTile(tile[1], tile[2], 'miles');

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

    var smallMiles = Math.floor(miles);
    if (smallMiles) {

        var tileGeom = tilebelt.tileToGeoJSON(tile);
        if (tileGeom.type == 'Polygon') {
            tileGeom.coordinates[0] = tileGeom.coordinates[0].map(function(coord) {
                coord[0] = Math.round(coord[0] * 10000000)/10000000;
                coord[1] = Math.round(coord[1] * 10000000)/10000000;
                return coord;
            });
        }

        tile = {
            type: 'Feature',
            geometry: tileGeom,
            properties: {
                miles: smallMiles
            }
        };
        write(JSON.stringify(tile) + '\n');
    }

    done(null, miles);
};
