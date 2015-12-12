/* jshint node: true */
'use strict';

var $ = require('jquery');
var getUrlParameter = require('./includes/utils').getUrlParameter;

var Console = {
  render: function(container) {
    var taskId = getUrlParameter('task');
    console.log('task id: %s', taskId);
    if (taskId === null) {
      $(container).append('TASK ID is not specified!!!');
      return;
    }
    $(container).append('Console output of TASK "' + taskId + '"...\r\n');
    var socket = require('./includes/socket')(taskId, function(data) {
      $(container).append(data);
    });
  }
};


Console.render('.console');
