/* jshint node: true */
'use strict';

var $ = require('jquery');
var moment = require('moment');

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
      if (d.done) return d.passed ? 'passed' : 'failed';
      return 'running';
    }

    var statusIcon = {
      passed: '<i class="fa fa-check"></i>',
      failed: '<i class="fa fa-close"></i>',
      pending: '<i class="fa fa-clock-o"></i>',
      running: '<i class="fa fa-refresh"></i>'
    };

    var apiUrl = self.done === true ? '/api/tasks/done' : '/api/tasks';

    function _getTaskLogLink(task) {
      if (task.done) {
        return '<a class="ci-more" target="_blank" href="' + task.consolelink + '"><i class="fa fa-terminal"></i></a>' +
          '<a class="ci-more" target="_blank" href="' + task.loglink + '"><i class="fa fa-external-link"></i></a>';
      } else if (task.started) {
        return '<a class="ci-more" target="_blank" href="/console.html?task=' + task._id + '"><i class="fa fa-terminal"></i></a>';
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
               '  <td><a class="ci-build" href="">' + d.build + '</a></td>' +
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

// show the active tasks defaultly
TaskQueue.render('#content-wrapper>table>tbody');

// scroll to the end of page, load extra tasks
$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() >= ($(document).height() - 20)) {
    if (TaskQueue.end === false) {
      TaskQueue.page++;
      TaskQueue.render('#content-wrapper>table>tbody');
    }
  }
});

