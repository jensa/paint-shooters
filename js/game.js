
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
  //mouse movement
  this.rotation = getRotationAngle(this.x+this.width/2, this.y+this.height/2, inputs.mouseX(), inputs.mouseY());
}

Player.prototype.update = function(map){
  var diff = Date.now() - this.lastUpdate;


  var newX = this.x + this.dx * (diff/1000);
  var newY = this.y + this.dy * (diff/1000);

  if(newX > 0 && newX < map.width)
    this.x = newX;
  if(newY > 0 && newY < map.height)
    this.y = newY;

  this.lastUpdate = Date.now();
}

Player.prototype.draw = function(ctx, canvas, map){
  //canvas box: canvas.map_corner.x
  var x = this.x - canvas.map_corner.x;
  var y = this.y - canvas.map_corner.y;

  //if the thing is outside of the box it wont be drawn.

  var centerX = x+this.width/2;
  var centerY = y+this.height/2;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-(this.rotation - 180) * Math.PI / 180);
  ctx.translate(-centerX, -centerY);
  ctx.beginPath();
  ctx.rect(x,y,this.width,this.height);
  //draw a gun typ ething to mark rotation
  ctx.rect(centerX - 3, y-3, 6, 3);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
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

Game.prototype.initMap = function(map){
  this.map = map;
}

Game.prototype.getLocalPlayer = function(){
  return this.players[this.localPlayerId];
}

Game.prototype.updatePlayer = function(playerdata){
    this.players[playerdata.id].changePosition(positionData);
}

Game.prototype.run = function(){
  this.ctx.clear(false)
  var player = this.players[this.localPlayerId];
  if(!player)
    return;
  player.parseInput(this.inputHandler);
  player.update(this.map);

  updateCanvasCoords(player, this.canvas);

  player.draw(this.ctx, this.canvas, this.map);
  for (var playerKey in this.players) {
    player = this.players[playerKey];
    if(playerKey == this.localPlayerId)
      continue;
    player.update(this.map);
    player.draw(this.ctx, this.canvas, this.map);
  }
}

function updateCanvasCoords(player, canvas){
  var centerX = player.x+player.width/2;
  var centerY = player.y+player.height/2;
  canvas.map_corner = {x:centerX - canvas.width/2, y:centerY - canvas.height/2};
}


function round(num){
  return Math.round(num * 100) / 100;
}

function deg2rad(deg){
  return deg * (Math.PI / 180);
}

function getRotationAngle(oldX, oldY, newX, newY){
  return Math.atan2(newX - oldX, newY - oldY) * 180/ Math.PI;
}
