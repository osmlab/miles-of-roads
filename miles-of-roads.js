module.exports = function (sources, tile, write, done) {
    var blacklist = [
        'footway',
        'cycleway',
        'steps',
        'bridleway',
        'path',
        'track',
        'pedestrian'
    ];

    var osm = sources.osm.osm;
    var roads = osm.features.filter(function(feature) {
        return blacklist.indexOf(feature.properties.highway) > -1;
    });
    done(null, roads.length);
};
