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
var layerUrl2 = 'https://zhaoluyun.cartodb.com/api/v2/viz/8e41b432-fff8-11e5-9754-0e787de82d45/viz.json';
var layerUrl3 = 'https://zhaoluyun.cartodb.com/api/v2/viz/acfc0e5e-0edf-11e6-bd7e-0e787de82d45/viz.json';
var click = 0;
var sublayer = [];
var sublayer2= [1];
var sublayer3= [1];
var sublayer4= [1];
var sublayer5= [1];
var sublayer6= [1];
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



var layer1 = [1];
  $( "#school" ).click(function() {
    if(sublayer2[0]!==1){sublayer2.hide();}
    if(sublayer4[0]!==1){sublayer4.hide();}
    if(sublayer5[0]!==1){sublayer5.hide();}
    if(sublayer6[0]!==1){sublayer6.hide();}
    $('#title').text('Explore School District Housing');
    $('#subtitle').text('Click school to see the houses surrounding it');
    $('#mainpage').hide();
    sublayer.hide();
    $('#project-list').text('');
    $('#average').empty();
    $('#average').removeClass("alert alert-success");
    if (drawnLayerID !== 0) { map.removeLayer(map._layers[drawnLayerID]); drawnLayerID=0;}
    if(layer1[0] !== 1 ){layer1.remove();}
    $('.cartodb-legend-stack').hide();


    cartodb.createLayer(map, layerUrl2)
      .addTo(map)
      .on('done', function(layer) {
        layer.on('featureClick', function(e, latlng, pos, data) {
          if(sublayer3[0]!==1){sublayer3.hide();}
          nClosest(latlng, 20);
        });
        layer1 = layer;
      }).on('error', function(err) {
      });

      if(click!==0){map.removeControl(drawControl);click=0;}
  });


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
      circle: false
    },
  });
var drawnLayerID = 0;


  $( "#draw" ).click(function() {
    click = click+1;
    console.log(click);
      if(sublayer3[0]!==1){sublayer3.hide();}
      if(sublayer2[0]!==1){sublayer2.hide();}
      if(sublayer4[0]!==1){sublayer4.hide();}
      if(sublayer5[0]!==1){sublayer5.hide();}
      if(sublayer6[0]!==1){sublayer6.hide();}
      sublayer.show();
      $('#project-list').text('');
      $('#average').empty();
      $('#average').removeClass("alert alert-success");
      if(layer1[0] !== 1 ){layer1.remove();}
    $('.cartodb-legend-stack').show();
    $('.cartodb-legend.custom').hide();
    $('#title').text('Explore by Personal Drawing');
    $('#subtitle').text('Draw a point to see the housing that surrounding it. Draw a polygon to see the housing within it.');
    $('#mainpage').hide();

    if(click!==1){map.removeControl(drawControl);click=click-1;}
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
      var type = e.layerType;
      var layer = e.layer;

      if (type === 'rectangle') {
        pointsWithin(layer._latlngs);
      } else if (type === 'marker') {
    nClosest2(layer._latlng, 20);
  }
      if (drawnLayerID!==0) { map.removeLayer(map._layers[drawnLayerID]); drawnLayerID=0;}
      map.addLayer(layer);
      drawnLayerID = layer._leaflet_id;
    });

  });


  $( "#main" ).click(function() {
    if(sublayer3[0]!==1){sublayer3.hide();}
    if(sublayer2[0]!==1){sublayer2.hide();}
    if(sublayer4[0]!==1){sublayer4.hide();}
    if(sublayer5[0]!==1){sublayer5.hide();}
    if(sublayer6[0]!==1){sublayer6.hide();}
    if(click!==0){map.removeControl(drawControl);click=0;}
    $('#title').text('Second Hand Housing Sale Record in Beijing October 2014');
    $('#subtitle').text('');
    $('#project-list').text('');
    $('#average').empty();
    $('#average').removeClass("alert alert-success");
    if (drawnLayerID!==0) { map.removeLayer(map._layers[drawnLayerID]); drawnLayerID=0;}
      $('#mainpage').show();
    sublayer.show();
    if(layer1[0] !== 1 ){layer1.remove();}
    $('.cartodb-legend-stack').show();
    $('.cartodb-legend.custom').hide();

  });
