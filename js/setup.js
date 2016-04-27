// Leaflet map setup
var map = L.map('map', {
  center: [39.917324, 116.397330],
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);



// The viz.json output by publishing on cartodb
var layerUrl = 'https://zhaoluyun.cartodb.com/api/v2/viz/19eb8962-fff5-11e5-b571-0e787de82d45/viz.json';

var sublayer = [];
// Use of CartoDB.js
cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {
    sublayer = layer.getSubLayer(0);
    sublayer.on('featureClick', function(e, latlng, pos, data) {
    });
  }).on('error', function(err) {
    // console.log(err):
  });



  $( "#school" ).click(function() {

    sublayer.hide();
    $('.cartodb-legend-stack').hide();

    var layerUrl2 = 'https://zhaoluyun.cartodb.com/api/v2/viz/8e41b432-fff8-11e5-9754-0e787de82d45/viz.json';
    cartodb.createLayer(map, layerUrl2)
      .addTo(map)
      .on('done', function(layer) {
        layer.on('featureClick', function(e, latlng, pos, data) {
        });
        layer1 = layer
      }).on('error', function(err) {
      });

  });




  $( "#draw" ).click(function() {
    sublayer.show();
    layer1.remove();
    $('.cartodb-legend-stack').show();
    $('.cartodb-legend.custom').hide();

    // Leaflet draw setup
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        marker: false
      }
    });


    var drawnLayerID;
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      var type = e.layerType;
      var layer = e.layer;


      if (type === 'rectangle') {
        pointsWithin(layer._latlngs);
      }

      if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }
      map.addLayer(layer);
      drawnLayerID = layer._leaflet_id;
    });

  });
