


/** Find all points within the box constructed */
function pointsWithin(rect) {
  // Grab the southwest and northeast points in this rectangle
  var sw = rect[0];
  var ne = rect[2];

  var sql = 'SELECT * FROM storefront_improvement WHERE the_geom @ ST_MakeEnvelope(' +
    sw.lng + ','+ sw.lat + ',' + ne.lng + ',' + ne.lat + ', 4326)';

  $.ajax('https://zhaoluyun.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    //console.log('pointsWithin:', results);
    addRecords(results);
  });
}



/** Filter by numeric-input*/
var sublayer2= [];

$( "#go" ).click(function() {
  var sql = 'SELECT * FROM housing_final WHERE (price >= ' + $('#numeric-input1').val() + ' AND price < ' + $('#numeric-input2').val() + ')';
  console.log(sql);
  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      sublayer2 = layer.getSubLayer(0);
      sublayer2.set({
        sql: sql,
        cartocss: "#layer { marker-fill: red }",
      });

      sublayer2.on('featureClick', function(e, latlng, pos, data) {});
    }).on('error', function(err) {
      // console.log(err):
    });

});

$( "#clear" ).click(function() {
sublayer2.remove();
$('#project-list').text('');
});

var layer1 = [];





/**
 * function for adding one record
 *
 * The pattern of writing the function which solves for 1 case and then using that function
 *  in the definition of the function which solves for N cases is a common way to keep code
 *  readable, clean, and think-aboutable.

function addOneRecord(rec) {
  var name = $('<p></p>')
    .text('Name: ' + rec.business_name);

  var corridor = $('<p></p>')
    .text('Location: ' + rec.corridor);

  var check_amount = $('<p></p>')
    .text('Check Amount: ' + rec.check_amount);


  var recordElement = $('<li></li>')
    .addClass('list-group-item')
    .append(name)
    .append(corridor)
    .append(check_amount);

  $('#project-list').append(recordElement);
}

function addRecords(cartodbResults) {
  $('#project-list').empty();
  _.each(cartodbResults.rows, addOneRecord);
}
 */
