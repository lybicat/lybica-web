var $ = require('jquery');

function TestPlan(container) {
    this._container = $(container);
}


TestPlan.prototype.render = function() {
    var self = this;

    var addPlan = '<div><button type="submit" class="btn btn-success"><i class="fa fa-plus-square-o"></i>New Plan</button></div>';
    var tableHead = '<table class="table table-hover">' +
      '  <thead>' +
      '    <tr>' +
      '      <th>Plan Name</th>' +
      '      <th>Case Set</th>' +
      '      <th>Test Env</th>' +
      '      <th>#</th>' +
      '    </tr>' +
      '  </thead>' +
      '  <tbody>';
    var tableFoot = '</tbody></table>';
    var data = [{name: 'OAM RT', caseset: 'TestCase.OAM1.Test.all', device: 'TL0019'},
        {name: 'OAM RT', caseset: 'TestCase.OAM1.Test.all', device: 'TL0018'},
        {name: 'RRM RT', caseset: 'TestCase.RRM.Test.all', device: 'TL0119'},
        {name: 'OAM RT2', caseset: 'TestCase.OAM2.Test.all', device: 'TL0003'},
        {name: 'OAM RT3', caseset: 'TestCase.OAM3.Test.all', device: 'TL0023'},
    ];
    var tableRows = data.map(function(d) {
        return '<tr>' +
          '  <td><a class="plan-name">' + d.name + '</a></td>' +
          '  <td><a class="plan-case">' + d.caseset + '</a></td>' +
          '  <td><a class="plan-env">' + d.device + '</a></td>' +
          '  <td><a class="plan-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
          '</tr>';
    }).join('');

    var planTable = tableHead + tableRows + tableFoot;
    self._container.empty().append('<div class="testplan">' + planTable + addPlan + '</div>');
}

module.exports = TestPlan;
