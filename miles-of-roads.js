module.exports = function (sources, tile, write, done) {
    var osm = sources.osm.osm;
    var roads = osm.features.filter(function(feature) {
        return feature.properties.highway;
    });
    done(null, roads.length);
};
