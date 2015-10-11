socket_global_do_not_use = null;
var game = null;
function runGame(){
  var socket = io('http://localhost:3000');
  var canvas = document.getElementById("_canvas");
  game = new Game(canvas);
  socket_global_do_not_use = socket;
  socket.emit('set_player_name', {name:document.getElementById("_name").text})

  socket.on('shots', function(state){
    //do nothing so far
  });
  socket.on('player_joined', function(data){
    game.addPlayer(new Player(data.player, data.name));
  });
  socket.on('move', function(move){
      game.updatePlayer(move);
  });
  socket.on('paints', function(state){
    //do nothing so far
  });

  socket.on('init_game', function(data){
    for (var player in data.players) {
      game.addPlayer(data.players[player]);
    }
    game.initLocalPlayer(data.playerId);
  });


  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  window.onEachFrame = onEachFrame;
  window.onEachFrame(run);
}

function run(){
  if(game && game.canvas && game.canvas != null)
    game.run();
}


window.onbeforeunload = function(e){
  if(socket_global_do_not_use)
    socket_global_do_not_use.close();
};

runGame();
