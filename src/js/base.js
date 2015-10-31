'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;

var bootstrap = require('bootstrap');
var Dashboard = require('./dashboard');

$(document).ready(function() {
    // show dashboard
    (new Dashboard()).render();
}
