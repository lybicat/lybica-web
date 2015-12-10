module.exports = function(taskId) {
  var socket = io();
  socket.on('connect', function() {
    console.log('connected');
    socket.emit('console', {from: socket.id, task: taskId});
  });

  socket.on('data', function(msg) {
    console.log(msg);
  });

  return socket;
};

