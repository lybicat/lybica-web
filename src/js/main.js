var $ = require('jquery');
global.jQuery = global.$ = $;

var bootstrap = require('bootstrap');

var TaskQueue = require('./taskqueue');
var TestPlanner = require('./testplan');
var ResourceManager = require('./resourcemgr');
var TestScheduler = require('./testschedule');
var TestReporter = require('./testreport');

$(document).ready(function() {
    // binding events
    $('#testPlanLink').click(function() {
        return (new TestPlanner('#content-wrapper')).render();
    });

    $('#resourceMgrLink').click(function() {
        return (new ResourceManager('#content-wrapper')).render();
    });

    $('#testSchedulerLink').click(function() {
        return (new TestScheduler('#content-wrapper')).render();
    });

    $('#testReportLink').click(function() {
        return (new TestReporter('#content-wrapper')).render();
    });

    // show ongoing tasks defaultly
    return (new TaskQueue('#content-wrapper')).render();
});
