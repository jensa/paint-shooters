

exports.initHandler = function(board){
  return new PlayerHandler(board);
}

PlayerHandler = function(board){
  this.board = board;
  this.players = [];
  this.idCounter = 0;
}

PlayerHandler.prototype.addPlayer = function(socket, callback){
  var player = {
    x:round(this.board.width * Math.random()),
    y:round(this.board.height * Math.random()),
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
