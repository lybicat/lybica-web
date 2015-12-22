/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');
var postJSON = require('./includes/utils').postJSON;

function _formatCases(cases) {
  return cases.map(function(c) {
      return '<b>' + c.repo + ': </b>' + c.expr;
    }).join('<br>');
}

var TestPlan = {
  render: function(container) {
    $.getJSON('/api/plans', function(data) {
      var tableRows = data.map(function(d) {
        return '<tr>' +
               '  <td><a class="plan-name">' + d.name + '</a></td>' +
               '  <td><a class="plan-case">' + _formatCases(d.cases) + '<span class="badge">5</span></a></td>' +
               '  <td><a class="plan-env">' + d.devices.join(';') + '</a></td>' +
               '  <td><a class="plan-edit"><i class="fa fa-pencil-square-o"></i></a><a class="plan-run"><i class="fa fa-youtube-play"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).empty().append(tableRows);
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

// TODO: add validation for form field, mandentory fields should not be empty
$('#saveBtn').click(function() {
  var data = {
    name: $('#planName').val().trim(),
    labels: $('#planLabels').val(),
    devices: $('#planDevices').val() || [],
    actions: $('#planActions').val() || [],
    parallel: $('#planParallel').prop('checked'),
  };
  var caseRepo = $('#planCaseRepo').val();
  var caseExpr = $('#planCaseSet').val();
  if (caseRepo && caseExpr) {
    data.cases = [{repo: caseRepo, expr: caseExpr.trim()}];
  }

  postJSON('/api/plans', data, function() {
    $('#planEditForm').addClass('hidden');
    $.notify('plan saved!', {className: 'success', position: 'top center'});
    render();
  }, function() {
    $.notify('failed to save plan', {className: 'error', position: 'top center'});
  });
});

$('#cancelBtn').click(function() {
  $('#planEditForm').addClass('hidden');
});

function render() {
  TestPlan.render('#content-wrapper>table>tbody');
}

render();
