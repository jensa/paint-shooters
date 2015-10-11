

exports.initHandler = function(map){
  return new PlayerHandler(map);
}

PlayerHandler = function(map){
  this.map = map;
  this.players = [];
  this.idCounter = 0;
}

PlayerHandler.prototype.addPlayer = function(socket, callback){
  var player = {
    x:round(this.map.width * Math.random()),
    y:round(this.map.height * Math.random()),
    id:this.idCounter,
    rotation: Math.random() * 3,
    dx:0,
    dy:0,
  }
  this.idCounter += 1;

  this.players.push(player);
  callback(player);
}

function round(num){
  return Math.round(num * 100) / 100;
}
