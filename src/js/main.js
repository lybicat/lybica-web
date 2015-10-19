var $ = require('jquery');
global.jQuery = global.$ = $;

var bootstrap = require('bootstrap');

var TaskQueue = require('./taskqueue');

$(document).ready(function() {
    // binding events

    // show ongoing tasks defaultly
    var taskQueue = new TaskQueue('#content-wrapper');
    taskQueue.render();
});
