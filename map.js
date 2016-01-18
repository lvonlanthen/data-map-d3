// We specify the dimensions for the map container. We use the same
// width and height as specified in the CSS above.
var width = 900,
    height = 600;

// We create a SVG element in the map container and give it some
// dimensions.
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);

// We define a geographical projection
//     https://github.com/mbostock/d3/wiki/Geo-Projections
// and set the initial zoom to show the features.
var projection = d3.geo.mercator()
  // The approximate scale factor was found through try and error
  .scale(10000)
  // The geographical center of Switzerland is around 46.8°, 8.2°
  //     https://de.wikipedia.org/wiki/Älggi-Alp
  .center([8.226692, 46.80121])
  // Translate: Translate it to fit the container
  .translate([width/2, height/2]);

// We prepare a path object and apply the projection to it.
var path = d3.geo.path()
  .projection(projection);

// Load the features from the GeoJSON.
d3.json('data/ch_municipalities.geojson', function(error, features) {

  // We add a <g> element to the SVG element and give it a class to
  // style it later.
  svg.append('g')
      .attr('class', 'features')
    // D3 wants us to select the (non-existing) path objects first ...
    .selectAll('path')
      // ... and then enter the data. For each feature, a <path> element
      // is added.
      .data(features.features)
    .enter().append('path')
      // As "d" attribute, we set the path of the feature.
      .attr('d', path);

});
