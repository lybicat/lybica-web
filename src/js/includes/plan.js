/* jshint node: true */
'use strict';

var $ = require('jquery');
var postJSON = require('./utils').postJSON;

var Plan = {
  run: function(planId, buildId, callback) {
    $.getJSON('/api/plan/' + planId, function(plan) {
      // TODO: parallel run support
      var task = {
        planid: plan._id,
        planname: plan.name,
        build: buildId,
        cases: plan.cases,
        devices: plan.devices, // TODO: get from device service
        actions: plan.actions,
        labels: [], // TODO: get from device
      };
      postJSON('/api/tasks', task, function() {
        callback(null);
      }, function(err) {
        callback(err);
      });
    });
  }
};


module.exports = Plan;
