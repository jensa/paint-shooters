var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.render('game', {});
})
var port = process.env.PORT || 3000;


var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
var io = require('socket.io').listen(server);
var events = require('./event-io');
var playerHandler = require("./playerHandler");

var gameMap = {height:1000, width:1000};
events.setRoutes(io, playerHandler.initHandler(gameMap), gameMap);
