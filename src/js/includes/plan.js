/* jshint node: true */
'use strict';

var $ = require('jquery');
var Thenjs = require('thenjs');
var postJSON = require('./utils').postJSON;

var Plan = {
  run: function(planId, buildId, callback) {
    Thenjs(function(cont) {
      $.getJSON('/api/plan/' + planId, function(plan) {
        cont(null, plan);
      });
    })
    .then(function(cont, plan) {
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
        cont(null);
      }, function(err) {
        cont(err);
      });
    })
    .fin(function(cont, err) {
      callback(err);
    });
  },
  del: function(planId, callback) {
    $.ajax({
      url: '/api/plan/' + planId,
      type: 'DELETE',
      success: function() {
        callback();
      },
      error: function(err) {
        callback(err);
      }
    });
  }
};


module.exports = Plan;
