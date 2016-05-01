


/** Find all points within the box constructed */
function pointsWithin(rect) {
  // Grab the southwest and northeast points in this rectangle
  var sw = rect[0];
  var ne = rect[2];

  var sql = 'SELECT * FROM housing_final WHERE the_geom @ ST_MakeEnvelope(' +
    sw.lng + ','+ sw.lat + ',' + ne.lng + ',' + ne.lat + ', 4326)';

  $.ajax('https://zhaoluyun.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    var value = _.map(results.rows,function(value){return value.price;});
    var sum = _.reduce(value,function(memo,num){return memo+num;},0);
    var average = sum / value.length;
    console.log(average);
    $('#average').empty();
    $('#average').addClass("alert alert-success");
    $('#average').append('The average price of the housing within this area is '+ parseInt(average) + ' Yuan/Square Meters');
    addRecords(results);
  });
}



function nClosest(point, n) {
  var sql = 'SELECT * FROM housing_final ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(' + point[1] + ',' + point[0] + '),4326) ASC LIMIT ' + n;
console.log(sql);
  cartodb.createLayer(map, layerUrl3)
    .addTo(map)
    .on('done', function(layer) {
      sublayer3 = layer.getSubLayer(0);
      sublayer3.set({
        sql: sql,
        cartocss: "#layer { marker-fill: #5d4c52 }",
      });
    });

  $.ajax('https://zhaoluyun.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    var value = _.map(results.rows,function(value){return value.price;});
    var sum = _.reduce(value,function(memo,num){return memo+num;},0);
    var average = sum / value.length;
    console.log(average);
    $('#average').empty();
    $('#average').addClass("alert alert-success");
    $('#average').append('The average price of the housing near this school is '+ average + ' Yuan/Square Meters');
    addRecords(results);
  });
}

function nClosest2(point, n) {
  var sql = 'SELECT * FROM housing_final ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(' + point.lng + ',' + point.lat + '),4326) ASC LIMIT ' + n;
  $.ajax('https://zhaoluyun.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    var value = _.map(results.rows,function(value){return value.price;});
    var sum = _.reduce(value,function(memo,num){return memo+num;},0);
    var average = sum / value.length;
    console.log(average);
    $('#average').empty();
    $('#average').addClass("alert alert-success");
    $('#average').append('The average price of the housing near this point is '+ average + ' Yuan/Square Meters');
    addRecords(results);
  });
}



$( "#go1" ).click(function() {
sublayer.hide();
  if(sublayer2[0]!==1){sublayer2.hide();}
  var sql = 'SELECT * FROM housing_final WHERE (price >= ' + $('#numeric-input1').val() + ' AND price < ' + $('#numeric-input2').val() + ')';
  console.log(sql);
  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      sublayer2 = layer.getSubLayer(0);
      sublayer2.set({
        sql: sql,
        cartocss: "#layer { marker-fill: #f4b657 }",
      });

      sublayer2.on('featureClick', function(e, latlng, pos, data) {});
    }).on('error', function(err) {
      // console.log(err):
    });
});

$( "#clear1" ).click(function() {
sublayer.show();
    if(sublayer2[0]!==1){sublayer2.hide();}
});


$( "#go2" ).click(function() {
  sublayer.hide();
  if(sublayer4[0]!==1){sublayer4.hide();}
  var sql = 'SELECT * FROM housing_final WHERE (distance_subwaystation >= ' + $('#numeric-input3').val()/100000 + ' AND distance_subwaystation < ' + $('#numeric-input4').val()/100000 + ')';
  console.log(sql);
  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      sublayer4 = layer.getSubLayer(0);
      sublayer4.set({
        sql: sql,
        cartocss: "#layer { marker-fill: yellow }",
      });

      sublayer4.on('featureClick', function(e, latlng, pos, data) {});
    }).on('error', function(err) {
      // console.log(err):
    });
});

$( "#clear2" ).click(function() {
  sublayer.show();
    if(sublayer4[0]!==1){sublayer4.hide();}
});


$( "#go3" ).click(function() {
  sublayer.hide();
  if(sublayer5[0]!==1){sublayer5.hide();}
  var sql = 'SELECT * FROM housing_final WHERE (distance_keyprimary >= ' + $('#numeric-input5').val()/100000 + ' AND distance_keyprimary < ' + $('#numeric-input6').val()/100000 + ')';
  console.log(sql);
  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      sublayer5 = layer.getSubLayer(0);
      sublayer5.set({
        sql: sql,
        cartocss: "#layer { marker-fill: #8dbeb1 }",
      });

      sublayer5.on('featureClick', function(e, latlng, pos, data) {});
    }).on('error', function(err) {
      // console.log(err):
    });
});


$( "#clear3" ).click(function() {
  sublayer.show();
    if(sublayer5[0]!==1){sublayer5.hide();}
});

$( "#go4" ).click(function() {
  sublayer.hide();
  if(sublayer6[0]!==1){sublayer6.hide();}
  var sql = 'SELECT * FROM housing_final WHERE (distance_keymiddle >= ' + $('#numeric-input7').val()/100000 + ' AND distance_keymiddle < ' + $('#numeric-input8').val()/100000 + ')';
  console.log(sql);
  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      sublayer6 = layer.getSubLayer(0);
      sublayer6.set({
        sql: sql,
        cartocss: "#layer { marker-fill: #f1625d }",
      });

      sublayer6.on('featureClick', function(e, latlng, pos, data) {});
    }).on('error', function(err) {
      // console.log(err):
    });
});

$( "#clear4" ).click(function() {
  sublayer.show();
    if(sublayer6[0]!==1){sublayer6.hide();}
});

function addOneRecord(rec) {
  var name = $('<p></p>')
    .text('Name: ' + rec.name);
  var area = $('<p></p>')
      .text('Area: ' + rec.area +' Square Meters');
  var totalprice = $('<p></p>')
    .text('Total Price: ' + rec.totalprice +'0 Thouand Yuan');
  var yearbuilt = $('<p></p>')
    .text('Year of Construction: ' + rec.yearbuilt);
  var subway = $('<p></p>')
      .text('Distance to Subway Station: ' + parseInt(rec.distance_subwaystation*100000) +' Meters');
  var primary = $('<p></p>')
      .text('Distance to Top Primary School: ' + parseInt(rec.distance_keyprimary*100000) +' Meters');
  var middle = $('<p></p>')
      .text('Distance to Top Middle School: ' + parseInt(rec.distance_keymiddle*100000) +' Meters');
  var recordElement = $('<li></li>')
    .addClass('list-group-item list-group-item-info')
    .append(name)
    .append(area)
    .append(totalprice)
    .append(yearbuilt)
    .append(subway)
    .append(primary)
    .append(middle);

  $('#project-list').append(recordElement);
}

function addRecords(cartodbResults) {
  $('#project-list').empty();
  _.each(cartodbResults.rows, addOneRecord);
}
