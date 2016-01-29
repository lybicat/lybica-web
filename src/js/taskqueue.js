/* jshint node: true */
'use strict';

var $ = require('jquery');
var moment = require('moment');
var Plan = require('./includes/plan');
var utils = require('./includes/utils');

var TaskQueue = {
  page: 1,
  end: false,
  done: false,
  render: function(container, clear) {
    var self = this;

    if (clear === true) {
      self.page = 1;
      self.end = false;
      $(container).empty();
    }

    function _getStatusTxt(d) {
      if (d.started === false) return 'pending';
      if (d.aborted) return 'aborted';
      if (d.done) return d.passed ? 'passed' : 'failed';
      return 'running';
    }

    var statusIcon = {
      passed: '<i class="fa fa-check"></i>',
      failed: '<i class="fa fa-close"></i>',
      aborted: '<i class="fa fa-bolt"></i>',
      pending: '<i class="fa fa-clock-o"></i>',
      running: '<i class="fa fa-refresh"></i>'
    };

    var apiUrl = self.done === true ? '/api/tasks/done' : '/api/tasks';

    function _getTaskLogLink(task) {
      var rerunLink = '<a class="task-rerun" target="_blank" href="javascript:void(0)"' +
        ' buildid="' + task.build + '" planid="' + task.planid + '">' +
        '<i class="fa fa-retweet"></i></a>';

      if(task.aborted) {
        return rerunLink;
      } else if (task.done) {
        return '<a class="task-console" target="_blank" href="' + task.consolelink + '"><i class="fa fa-terminal"></i></a>' +
          '<a class="task-artifact" target="_blank" href="' + task.loglink + '"><i class="fa fa-external-link"></i></a>' + rerunLink;
      } else if (task.started) {
        return '<a class="task-console" target="_blank" href="/console.html?task=' + task._id + '"><i class="fa fa-terminal"></i></a>';
      }

      return '';
    }

    $.getJSON(apiUrl + '?page=' + self.page, function(data) {
      if (data.length === 0) {
        self.end = true;
        return;
      }

      var tableRows = data.map(function(d) {
        var statusTxt = _getStatusTxt(d);
        return '<tr>' +
               '  <td><span class="ci-status ci-' + statusTxt + '">' + statusIcon[statusTxt] + statusTxt + '</span></td>' +
               '  <td><a class="ci-build" href="javascript:void(0)">' + d.build + '</a></td>' +
               '  <td><a class="ci-plan" href="/api/plan/' + d.planid + '">' + (d.planname || 'N/A') + '</a></td>' +
               '  <td><a class="ci-device">' + d.devices.join(';') + '</a></td>' +
               '  <td><a class="ci-trigger">' + d.triggerby + '</a></td>' +
               '  <td><a class="ci-time">' + moment(d.triggerat).fromNow() + '</a></td>' +
               '  <td>' + _getTaskLogLink(d) + '</td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};

// button event binding
$('#activeTasksBtn').click(function() {
  $(this).addClass('active');
  $('#doneTasksBtn').removeClass('active');
  TaskQueue.done = false;
  TaskQueue.render('#content-wrapper>table>tbody', true);
});

$('#doneTasksBtn').click(function() {
  $(this).addClass('active');
  $('#activeTasksBtn').removeClass('active');
  TaskQueue.done = true;
  TaskQueue.render('#content-wrapper>table>tbody', true);
});

// search tasks with specified build
$('body').on('click', '.ci-build', function(e) {
  var build = $(this).text();
  e.preventDefault();
  $('#taskSearchInput input').val(build);
  // TODO: rerender tasks
});

// handle task rerun click
$('body').on('click', '.task-rerun', function(e) {
  var planId = $(this).attr('planid');
  var buildId = $(this).attr('buildid');

  e.preventDefault();
  Plan.run(planId, buildId, function(err) {
    if(err) return $.notify('failed to rerun the task, error: ' + err);

    TaskQueue.done = false;
    TaskQueue.render('#content-wrapper>table>tbody', true);
  });
})

// show the active tasks defaultly
TaskQueue.render('#content-wrapper>table>tbody');

// scroll to the end of page, load extra tasks
utils.infinitScroll(function() {
  if (TaskQueue.end === false) {
    TaskQueue.page++;
    TaskQueue.render('#content-wrapper>table>tbody');
  }
});

