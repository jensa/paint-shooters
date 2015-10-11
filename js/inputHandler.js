var InputHandler = function(){
  //set key listeners
  document.addEventListener("keydown", this.keyDown, false);
  document.addEventListener("keyup", this.keyUp, false);
  document.addEventListener("mousemove", this.mouseMove, false);
//emit this thing when something really happens
//remember to round down everything
  //socket.emit('player_move', {
  //  x:2,
  //  y:3,
  //  rotation:3,
  //  speed:2,
  //  });
}

var keyCodes = {
  UP:38,
  DOWN:40,
  LEFT:37,
  RIGHT:39
}
keypressed = [];
mousePosX = 0;
mousePosY = 0;

InputHandler.prototype.up = function(){
  return keypressed[keyCodes.UP];
}

InputHandler.prototype.down = function(){
  return keypressed[keyCodes.DOWN];
}

InputHandler.prototype.left = function(){
  return keypressed[keyCodes.LEFT];
}

InputHandler.prototype.right = function(){
  return keypressed[keyCodes.RIGHT];
}

InputHandler.prototype.none = function(){
  return !keypressed[keyCodes.RIGHT] && !keypressed[keyCodes.LEFT] &&
  !keypressed[keyCodes.UP] && !keypressed[keyCodes.DOWN];
}

InputHandler.prototype.keyDown = function(e){
  keypressed[e.keyCode] = true;
}

InputHandler.prototype.keyUp = function(e){
  keypressed[e.keyCode] = false;
}

InputHandler.prototype.mouseY = function(){
  return mousePosY;
}

InputHandler.prototype.mouseX = function(){
  return mousePosX;
}

InputHandler.prototype.mouseMove = function(e){
  mousePosX = e.clientX;
  mousePosY = e.clientY;
}
