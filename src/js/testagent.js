var $ = require('jquery');

var TestAgent = {
  render: function(container) {
    var data = [
      {available: false, name: 'my-laptop', ip: '127.0.0.1', runners: {all: 2, running: 0}, labels: ['linux', 'node', 'python']},
      {available: true, name: 'my-desktop', ip: '127.0.0.2', runners: {all: 5, running: 1}, labels: ['windows', 'c#', 'python']},
      {available: true, name: 'test-workstation', ip: '127.0.0.3', runners: {all: 10, running: 0}, labels: ['linux', 'node', 'nginx', 'docker', 'python']},
      {available: true, name: 'second-workstation', ip: '127.0.0.4', runners: {all: 10, running: 10}, labels: ['linux', 'node', 'nginx', 'docker', 'python']},
    ];

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
  }
};


TestAgent.render('#content-wrapper>table>tbody');
