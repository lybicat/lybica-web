'use strict';

var $ = require('jquery');

var TestPlan = {
    render: function(container) {
        var data = [{name: 'OAM RT', caseset: 'TestCase.OAM1.Test.all', device: 'TL0019'},
            {name: 'OAM RT', caseset: 'TestCase.OAM1.Test.all', device: 'TL0018'},
            {name: 'RRM RT', caseset: 'TestCase.RRM.Test.all', device: 'TL0119'},
            {name: 'OAM RT2', caseset: 'TestCase.OAM2.Test.all', device: 'TL0003'},
            {name: 'OAM RT3', caseset: 'TestCase.OAM3.Test.all', device: 'TL0023'},
        ];
        var tableRows = data.map(function(d) {
            return '<tr>' +
              '  <td><a class="plan-name">' + d.name + '</a></td>' +
              '  <td><a class="plan-case">' + d.caseset + '<span class="badge">5</span></a></td>' +
              '  <td><a class="plan-env">' + d.device + '</a></td>' +
              '  <td><a class="plan-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
              '</tr>';
        }).join('');

        $(container).append(tableRows);
    }
};

TestPlan.render('div.testplan>table>tbody');
