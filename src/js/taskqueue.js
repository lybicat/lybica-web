var $ = require('jquery');
var moment = require('moment');

var TaskQueue = {
  render: function(container, showDoneTasks) {
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

    var apiUrl = showDoneTasks === true ? '/api/tasks/done' : '/api/tasks';

    function _getTaskLogLink(task) {
      if (task.done)
        return '<a class="ci-more" target="_blank" href="' + task.loglink + '"><i class="fa fa-external-link"></i></a>';
      else if (task.started)
        return '<a class="ci-more" target="_blank" href="' + task.consolelink + '"><i class="fa fa-external-link"></i></a>';
      return '';
    }

    $.getJSON(apiUrl, function(data) {
      var tableRows = data.map(function(d) {
        var statusTxt = _getStatusTxt(d);
        return '<tr>' +
               '  <td><span class="ci-status ci-' + statusTxt + '">' + statusIcon[statusTxt] + statusTxt + '</span></td>' +
               '  <td><a class="ci-build" href="">' + d.build + '</a></td>' +
               '  <td><a class="ci-plan">' + (d.plan || 'PILOT') + '</a></td>' +
               '  <td><a class="ci-device">' + d.device.join(';') + '</a></td>' +
               '  <td><a class="ci-trigger">' + d.triggerby + '</a></td>' +
               '  <td><a class="ci-time">' + moment(d.triggerat).fromNow() + '</a></td>' +
               '  <td>' + _getTaskLogLink(d) + '</td>' +
               '</tr>';
      }).join('');

      $(container).empty().append(tableRows);
    });
  }
};

// button event binding
$('#activeTasksBtn').click(function() {
  $(this).addClass('active');
  $('#doneTasksBtn').removeClass('active');
  TaskQueue.render('#content-wrapper>table>tbody');
});

$('#doneTasksBtn').click(function() {
  $(this).addClass('active');
  $('#activeTasksBtn').removeClass('active');
  TaskQueue.render('#content-wrapper>table>tbody', true);
});

// show the active tasks defaultly
TaskQueue.render('#content-wrapper>table>tbody');
