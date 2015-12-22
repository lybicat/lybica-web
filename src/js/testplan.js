/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');

var TestPlan = {
  render: function(container) {
    $.getJSON('/api/plans', function(data) {
      var tableRows = data.map(function(d) {
        return '<tr>' +
               '  <td><a class="plan-name">' + d.name + '</a></td>' +
               '  <td><a class="plan-case">' + d.cases.join(';') + '<span class="badge">5</span></a></td>' +
               '  <td><a class="plan-env">' + d.devices.join(';') + '</a></td>' +
               '  <td><a class="plan-edit"><i class="fa fa-pencil-square-o"></i></a><a class="plan-run"><i class="fa fa-youtube-play"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};

$('#newPlanBtn').click(function() {
  $('#planEditForm').removeClass('hidden');
  $('#planLabels').select2({tags: true});
  $('#planCaseRepo').select2();
  $('#planDevices').select2();
  $('#planActions').select2();
});

$('#saveBtn').click(function() {
  // TODO: save plan here
  $('#planEditForm').addClass('hidden');
  $.notify('plan saved!', 'success');
});

$('#cancelBtn').click(function() {
  $('#planEditForm').addClass('hidden');
});

TestPlan.render('#content-wrapper>table>tbody');

