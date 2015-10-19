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
        triggerat: '3hours ago'}, {
        status: 'pending',
        build: 'TL15A_123414_23444',
        plan: 'CRT SISO',
        device: 'TL1501',
        triggerby: 'QT1',
        triggerat: '3hours ago'}];

    var tableRows = '<tr>' +
      '  <td><span class="ci-status ci-pending"><i class="fa fa-clock-o"></i>pending</span></td>' +
      '  <td><a class="ci-build" href="">TL15A_123414_23444</a></td>' +
      '  <td><a class="ci-plan">CRT SISO</a></td>' +
      '  <td><a class="ci-device">TL1501</a></td>' +
      '  <td><a class="ci-trigger">QT1</a></td>' +
      '  <td><a class="ci-time">3hours ago</a></td>' +
      '</tr>' +
      '<tr>' +
      '  <td><span class="ci-status ci-running"><i class="fa fa-refresh"></i>running</span></td>' +
      '  <td><a class="ci-build" href="">TL15A_123414_23443</a></td>' +
      '  <td><a class="ci-plan">CRT OAM</a></td>' +
      '  <td><a class="ci-device">TL1504</a></td>' +
      '  <td><a class="ci-trigger">QT2</a></td>' +
      '  <td><a class="ci-time">4hours ago</a></td>' +
      '</tr>';
    self._container.empty().append(tableHead + tableRows + tableFoot);
}

module.exports = TaskQueue;
