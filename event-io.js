exports.setRoutes = function(io, playerHandler, map){
  io.on('connection', function (socket) {
    var thisPlayer = null;

    socket.on('set_player_name', function(data){
      playerHandler.addPlayer(socket, function(player){
        thisPlayer = player;
        socket.emit('init_game', {players:playerHandler.players, playerId:player.id, map:map});
        socket.broadcast.emit('player_joined', {player:player, name:data.name});
      });

    });

    socket.on('player_move', function (data){
      thisPlayer.x = data.x;
      thisPlayer.y = data.y;
      thisPlayer.rotation = data.rotation;
      thisPlayer.dx = data.dx;
      thisPlayer.dy = data.dy;
      socket.broadcast.emit('move', thisPlayer);
      }
    );

  });
}
