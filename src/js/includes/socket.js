module.exports = function(taskId, dataCallback) {
  var socket = io();
  socket.on('connect', function() {
    socket.emit('console', {from: socket.id, task: taskId});
  });

  socket.on('data', function(msg) {
    dataCallback(msg);
  });

  return socket;
};

