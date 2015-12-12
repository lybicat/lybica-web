/* jshint node: true */
'use strict';

module.exports = function(taskId, dataCallback) {
  var socket = io(); // in the page, you should include socket.io.js first
  socket.on('connect', function() {
    socket.emit('console', {from: socket.id, task: taskId});
  });

  socket.on('data', function(msg) {
    dataCallback(msg);
  });

  return socket;
};
