var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.render('game', {});
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
var io = require('socket.io').listen(server);
var events = require('./event-io');
var playerHandler = require("./playerHandler");
events.setRoutes(io, playerHandler.initHandler({height:500, width:500}));
