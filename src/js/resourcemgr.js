var $ = require('jquery');

function ResourceManager(container) {
    this._container = $(container);
}


ResourceManager.prototype.render = function() {
    var self = this;
    var data = [{status: 'idle', name: 'BTS-1', ip: '127.1.1.2', build: 'TL15A_2341414_2412414', tags: ['FSIH']},
        {status: 'running', name: 'BTS-2', ip: '127.1.2.2', build: 'TL15A_2341414_2412413', tags: ['FSMF', 'CI', 'GOLDEN']},
        {status: 'idle', name: 'BTS-3', ip: '127.1.3.2', build: 'TL15A_2341414_2412414', tags: ['FSMF']},
        {status: 'maintaining', name: 'BTS-4', ip: '127.1.4.2', build: 'TL15A_2341414_2412414', tags: ['FSMF', 'SPRING']},
        {status: 'maintaining', name: 'BTS-5', ip: '127.1.5.2', build: 'TL15A_2341414_2412414', tags: ['FSIH', 'CMCC']},
    ];
    var btsTable = '<table class="table table-hover">' +
        '  <thead>' +
        '    <tr>' +
        '      <th>Status</th>' +
        '      <th>Name</th>' +
        '      <th>IP Addr.</th>' +
        '      <th>Build Version</th>' +
        '      <th>Tags</th>' +
        '    </tr>' +
        '  </thead>' +
        '  <tbody>' +
        data.map(function(d) {
            return '<tr>' +
              '  <td><a class="resource-status">' + d.status + '</a></td>' +
              '  <td><a class="resource-name">' + d.name + '</a></td>' +
              '  <td><a class="resource-ip">' + d.ip + '</a></td>' +
              '  <td><a class="resource-build">' + d.build + '</a></td>' +
              '  <td><a class="resource-tags">' +
              d.tags.map(function(tag) {
                  return '<span class="tag label label-default">' + tag + '</span>';
              }).join('') + '</a></td>' +
              '</tr>';
        }).join('') +
        '</tbody></table>';
    var tm500Table = fpcTable = btsTable;
    var resources = '<div class="resourcemgr tabbable">' +
        '  <ul class="nav nav-tabs">' +
        '    <li class="active"><a href="#bts-tab" data-toggle="tab">BTS</a></li>' +
        '    <li><a href="#tm500-tab" data-toggle="tab">TM500</a></li>' +
        '    <li><a href="#fpc-tab" data-toggle="tab">FPC</a></li>' +
        '  </ul>' +
        '  <div class="tab-content">' +
        '    <div class="tab-pane active" id="bts-tab">' + btsTable + '</div>' +
        '    <div class="tab-pane" id="tm500-tab">' + tm500Table + '</div>' +
        '    <div class="tab-pane" id="fpc-tab">' + fpcTable + '</div>' +
        '   </div>' +
        '</div>';

    self._container.empty().append(resources);
}

module.exports = ResourceManager;
