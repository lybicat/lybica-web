module.exports = function(taskId) {
  var socket = io();
  socket.on('connect', function() {
    console.log('connected');
  });

  return socket;
};

