var $ = require('jquery');

var TaskQueue = {
  render: function(container) {
    $.getJSON('/api/tasks', function(data) {
      var tableRows = data.map(function(d) {
        var statusTxt = d.started && 'running' || 'pending';
        return '<tr>' +
               '  <td><span class="ci-status ci-' + statusTxt + '">' + '<i class="fa ' + (d.started && 'fa-refresh' || 'fa-clock-o') + '"></i>' + statusTxt + '</span></td>' +
               '  <td><a class="ci-build" href="">' + d.build + '</a></td>' +
               '  <td><a class="ci-plan">' + (d.plan || 'PILOT') + '</a></td>' +
               '  <td><a class="ci-device">' + d.device.join(';') + '</a></td>' +
               '  <td><a class="ci-trigger">' + d.triggerby + '</a></td>' +
               '  <td><a class="ci-time">' + d.triggerat + '</a></td>' +
               '  <td><a class="ci-more"><i class="fa fa-external-link"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};


TaskQueue.render('#content-wrapper>table>tbody');
