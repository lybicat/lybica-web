var $ = require('jquery');

function TaskQueue(container) {
    this._container = $(container);
}


TaskQueue.prototype.render = function() {
    var self = this;
    var tableHead = '<table class="table table-hover">' +
      '  <thead>' +
      '    <tr>' +
      '      <th>Status</th>' +
      '      <th>Build</th>' +
      '      <th>Test Plan</th>' +
      '      <th>Env</th>' +
      '      <th>Triggered by</th>' +
      '      <th>Triggered at</th>' +
      '    </tr>' +
      '  </thead>' +
      '  <tbody>';
    var tableFoot = '</tbody></table>';
    var data = [{status: 'pending',
        build: 'TL15A_123414_23444',
        plan: 'CRT SISO',
        device: 'TL1501',
        triggerby: 'QT1',
        triggerat: '3hours ago'},
        {status: 'running',
        build: 'TL15A_123412_23422',
        plan: 'CRT RRM',
        device: 'TL1509',
        triggerby: 'QT2',
        triggerat: '1hour ago'},
        {status: 'running',
        build: 'TL15A_123412_23422',
        plan: 'CRT TRM',
        device: 'TL1510',
        triggerby: 'QT2',
        triggerat: '1hour ago'}];
    var tableRows = data.map(function(d) {
        return '<tr>' +
          '  <td><span class="ci-status ci-' + d.status + '">' + '<i class="fa ' + (d.status === 'pending' && 'fa-clock-o' || 'fa-refresh') + '"></i>' + d.status + '</span></td>' +
          '  <td><a class="ci-build" href="">' + d.build + '</a></td>' +
          '  <td><a class="ci-plan">' + d.plan + '</a></td>' +
          '  <td><a class="ci-device">' + d.device + '</a></td>' +
          '  <td><a class="ci-trigger">' + d.triggerby + '</a></td>' +
          '  <td><a class="ci-time">' + d.triggerat + '</a></td>' +
          '</tr>';
    }).join('');

    self._container.empty().append(tableHead + tableRows + tableFoot);
}

module.exports = TaskQueue;
