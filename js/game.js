
//var canvas = document.getElementById("_canvas").getContext("2d");
var Player = function(playerData, playerName){
    this.TOP_SPEED = 500;
    this.ACCELERATION = 5;
    this.width = 20;
    this.height = 20;
    this.x = playerData.x;
    this.y = playerData.y;
    this.id = playerData.id;
    this.dx = playerData.dx;
    this.dy = playerData.dy;
    this.name = playerName;
    this.rotation = playerData.rotation;
    this.lastUpdate = Date.now();

}

Player.prototype.accelerate = function(){
  this.speed = Math.min(this.speed + this.ACCELERATION, this.TOP_SPEED);
}

Player.prototype.changePosition = function(positiondata){
  this.x = positiondata.x;
  this.y = positiondata.y;
  this.dx = positiondata.dx;
  this.dy = positiondata.dx;
  this.rotation = positiondata.rotation;
}

Player.prototype.parseInput = function(inputs){
  if(inputs.down())
    this.dy = Math.min(this.TOP_SPEED, this.dy + this.ACCELERATION);
  if(inputs.up())
    this.dy = Math.max(-this.TOP_SPEED, this.dy - this.ACCELERATION);
  if(inputs.left())
    this.dx = Math.max(-this.TOP_SPEED, this.dx - this.ACCELERATION);
  if(inputs.right())
    this.dx = Math.min(this.TOP_SPEED, this.dx + this.ACCELERATION);
  if(inputs.none()){
    this.dx = 0;
    this.dy = 0;
  }
}

Player.prototype.update = function(){
  var diff = Date.now() - this.lastUpdate;

  this.x = this.x + this.dx * (diff/1000);
  this.y = this.y + this.dy * (diff/1000);

  // update speed (friction)
  //this.speed = Math.max(0, this.speed - friction);

  //this.rotation = this.rotation + 0.1;

  this.lastUpdate = Date.now();
}

Player.prototype.draw = function(canvas){
  canvas.save();
  var centerX = this.x+this.width/2;
  var centerY = this.y+this.height/2 ;
  canvas.translate(centerX, centerY);
  canvas.rotate(this.rotation);
  canvas.translate(-centerX, -centerY);
  canvas.beginPath();
  canvas.rect(this.x,this.y,this.width,this.height);
  canvas.stroke();
  canvas.closePath();
  canvas.restore();
}


var Game = function(canvas){
    this.players = {};
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.inputHandler = new InputHandler();
}

Game.prototype.addPlayer = function(playerdata){
  this.players[playerdata.id] = new Player(playerdata);
}

Game.prototype.initLocalPlayer = function(playerId){
  this.localPlayerId = playerId;
}

Game.prototype.getLocalPlayer = function(){
  return this.players[this.localPlayerId];
}

Game.prototype.updatePlayer = function(playerdata){
    this.players[playerdata.id].changePosition(positionData);
}

Game.prototype.run = function(){
  this.ctx.clear(false)
  for (var playerKey in this.players) {
    var player = this.players[playerKey];
    if(playerKey == this.localPlayerId)
      player.parseInput(this.inputHandler);
    player.update();
    player.draw(this.ctx);
  }
}


function round(num){
  return Math.round(num * 100) / 100;
}

function deg2rad(deg){
  return deg * (Math.PI / 180);
}
