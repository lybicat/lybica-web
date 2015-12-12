/* jshint node: true */
'use strict';

var $ = require('jquery');

var TestAgent = {
  render: function(container) {
    function _getStatusTxt(d) {
      if (d.available === false)
        return 'offline';
      else if (d.runners.running === 0)
        return 'idle';
      else if (d.runners.running === d.runners.all)
        return 'unavailable';
      return 'available';
    }

    var statusIcon = {
      offline: '<i class="fa fa-power-off"></i>',
      idle: '<i class="fa fa-battery-full"></i>',
      available: '<i class="fa fa-battery-half"></i>',
      unavailable: '<i class="fa fa-battery-empty"></i>'
    };

    $.getJSON('/api/agents', function(data) {
      var tableRows = data.map(function(d) {
        var statusTxt = _getStatusTxt(d);
        return '<tr>' +
               '  <td><a class="agent-status agent-' + statusTxt + '">' + statusIcon[statusTxt] + statusTxt + '</td>' +
               '  <td><a class="agent-name">' + d.name + '</a></td>' +
               '  <td><a class="agent-ip">' + d.ip + '</a></td>' +
               '  <td><a class="agent-runners">' + d.runners.running + '/' + d.runners.all + '</a></td>' +
               '  <td><a class="agent-labels">' +
               d.labels.map(function(label) {
                   return '<span class="tag label label-default">' + label + '</span>';
               }).join('') + '</a></td>' +
               '  <td><a class="agent-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};


TestAgent.render('#content-wrapper>table>tbody');
